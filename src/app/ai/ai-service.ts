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
    private readonly model = tf.sequential();

    constructor() {
        this.createModel();
    }

    private createModel() {
        this.model.add(tf.layers.dense({ units: 8, inputDim: 5, activation: 'relu' }));
        this.model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
        this.model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

        const learningRate = 1;
        const optimizer = tf.train.sgd(learningRate);
        this.model.compile({ loss: 'binaryCrossentropy', optimizer, metrics: ['accuracy'] });
    }

    train(): Promise<any> {
        const input: number[][] = TrainingsDataHelper.getInput();
        const output: number[] = TrainingsDataHelper.getOutput();

        console.log('training now, hold on tight...');
        return new Promise(resolve => {
            const inputTensor = tf.tensor2d(input, [input.length, input[0].length]);
            const outputTensor = tf.tensor2d(output, [output.length, 1]);
            this.model.fit(inputTensor, outputTensor, { epochs: EPOCHS }).then(() => {
                console.log('finisehd training');

                const r = this.model.evaluate(inputTensor, outputTensor);
                console.log("Loss:");
                r[0].print();
                console.log("Accuracy:");
                r[1].print();
                resolve('');
            })
        })
    }

    getPrediction(currentGame: Game): Promise<Tuple2<Direction, number>[]> {
        return new Promise(resolve => {
            const predictionResult: Tuple2<Direction, number>[] = [];
            let loopCount: number = 0;

            for (let direction in Direction) {
                if (isNaN(Number(direction))) {
                    return;
                }

                this.predict(TrainingsDataHelper.createInputArray(currentGame, Number(direction))).then(prediction => {
                    prediction.data().then(res => {
                        let prediction = Array.from(res)[0];
                        predictionResult.push({
                            v1: Number(direction),
                            v2: prediction
                        } as Tuple2<Direction, number>);

                        loopCount++;
                        if (loopCount === 4) {
                            predictionResult.sort((a, b) => b.v2 - a.v2)
                            resolve(predictionResult)
                        }
                    })
                });
            }
        });
    }

    predict(gamefield: number[]): Promise<Tensor> {
        return new Promise(resolve => {
            const prediction = <Tensor>this.model.predict(tf.tensor2d(gamefield, [1, gamefield.length]));
            resolve(prediction);
        })
    }

}