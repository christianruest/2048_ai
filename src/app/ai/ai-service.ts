import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { Tensor } from '@tensorflow/tfjs';
import { EPOCHS } from '../models/constants/constants';
import { Direction } from '../models/enums/direction';
import { Game } from '../models/game';
import { Tuple2 } from '../models/tuples/tuple2';
import { TrainingsDataHelper } from './trainings-data-helper';

@Injectable({
    providedIn: 'root'
})
export class AiService {
    private model = tf.sequential();

    constructor() {
        this.createModel();
    }

    private createModel() {
        this.model.add(tf.layers.dense({ units: 128, inputDim: 16, activation: 'tanh' }));
        this.model.add(tf.layers.dense({ units: 256, activation: 'tanh' }));
        this.model.add(tf.layers.dense({ units: 512, activation: 'tanh' }));
        this.model.add(tf.layers.dense({ units: 4, activation: 'sigmoid' }));

        this.model.compile({ loss: 'categoricalCrossentropy', optimizer: tf.train.adam(), metrics: ['accuracy'] });
    }

    async train(): Promise<any> {
        const input: number[][] = TrainingsDataHelper.getInput();
        const output: number[][] = TrainingsDataHelper.getOutput();
        console.log('training now, hold on tight...');

        const inputTensor = tf.tensor2d(input, [input.length, input[0].length]);
        const outputTensor = tf.tensor2d(output, [output.length, output[0].length]);
        await this.model.fit(inputTensor, outputTensor, { epochs: EPOCHS, batchSize: 100 })
        console.log('finisehd training');

        const r = this.model.evaluate(inputTensor, outputTensor);
        console.log("Loss:");
        r[0].print();
        console.log("Accuracy:");
        r[1].print();
    }

    async getPrediction(currentGame: Game): Promise<Tuple2<Direction, number>[]> {
        const prediction = await this.predict(TrainingsDataHelper.createInputArray(currentGame))
        const res = await prediction.data()
        const arrayResult = Array.from(res);
        let predictionResult: Tuple2<Direction, number>[] = [];
        for (let i = 0; i < 4; i++) {
            predictionResult.push({
                v1: i,
                v2: arrayResult[i]
            } as Tuple2<Direction, number>)
        }
        predictionResult.sort((a, b) => b.v2 - a.v2);
        return predictionResult;
    }

    async predict(gamefield: number[]): Promise<Tensor> {
        return await <Tensor>this.model.predict(tf.tensor2d(gamefield, [1, gamefield.length]));
    }

    async saveModel() {
        await this.model.save('downloads://my-model');
    }

    async preloadModel() {
        const model = await tf.loadLayersModel('assets/my-model.json');
        console.log(`model loaded successfully, ready to rumble`);
    }

}