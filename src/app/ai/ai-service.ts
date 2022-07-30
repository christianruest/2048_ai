import * as tf from '@tensorflow/tfjs';
import { Tensor } from '@tensorflow/tfjs';
import { TrainingsDataHelper } from './trainings-data-helper';
import { EPOCHS } from '../models/constants/constants';

export class AiService {
    private readonly model = tf.sequential();

    constructor() {
        this.createModel();
    }

    private createModel() {
        this.model.add(tf.layers.dense({ units: 8, inputDim: 21, activation: 'sigmoid' }));
        this.model.add(tf.layers.dense({ units: 8, activation: 'sigmoid' }))
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

    predict(gamefield: number[]): Promise<Tensor> {
        return new Promise(resolve => {
            const prediction = <Tensor>this.model.predict(tf.tensor2d(gamefield, [1, gamefield.length]));
            resolve(prediction);
        })
    }



}