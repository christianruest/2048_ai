import { templateSourceUrl } from '@angular/compiler';
import { GameSimulation } from '../game-control/game-simulation';
import {
    MAX_INDEX, VALUE_CONVERTER
} from '../models/constants/constants';
import { Direction } from '../models/enums/direction';
import { Field } from '../models/field';
import { Game } from '../models/game';
import { MoveResult } from '../models/move-result';
import { Tuple2 } from '../models/tuples/tuple2';
import { AbstractCheck } from './helper-checks/abstract-check';
import { AiGameOverCheck } from './helper-checks/ai-game-over-check';
import { GreatestOnEdgeCheck } from './helper-checks/greatest-on-edge-check';
import { MovesPossibleCheck } from './helper-checks/moves-possible-check';
import { NumberOfMergesCheck } from './helper-checks/number-of-merges-check';
import { PreferedDirectionCheck } from './helper-checks/preferred-direction-check';
import { SameNextToEachOtherCheck } from './helper-checks/same-next-to-each-other-check';
import { ScoreIncreasedCheck } from './helper-checks/score-increased-check';
import { SuroundedByGreatersCheck } from './helper-checks/surounded-by-greaters-check';


export class TrainingsDataHelper {
    private static trainingsData: Tuple2<number[][], number[][]> = {} as Tuple2<number[][], number[][]>;
    private static ALL_CHECKS: AbstractCheck[] = [
        new MovesPossibleCheck(),
        new AiGameOverCheck(),
        new ScoreIncreasedCheck(),
        new SuroundedByGreatersCheck(),
        new GreatestOnEdgeCheck(),
        new SameNextToEachOtherCheck(),
        new PreferedDirectionCheck(),
        new NumberOfMergesCheck(),
    ]

    public static getInput(): number[][] {
        return this.trainingsData.v1;
    }


    public static setInput(input: number[][]) {
        this.trainingsData.v1 = input;
    }

    public static getOutput(): number[][] {
        return this.trainingsData.v2;
    }

    public static setOutput(output: number[][]): void {
        this.trainingsData.v2 = output;
    }

    public static resetTestdata() {
        this.trainingsData.v1 = [];
        this.trainingsData.v2 = [];
    }

    public static addEntries(game: Game): void {
        let inputData: number[] = [];
        let resultData: number[] = [];

        if (this.trainingsData.v1 === undefined) {
            this.trainingsData.v1 = [];
        }

        if (this.trainingsData.v2 === undefined) {
            this.trainingsData.v2 = [];
        }

        for (let i = 0; i < 4; i++) {
            let score: number = 0;
            const simulationResult: Tuple2<Direction, MoveResult> = {} as Tuple2<Direction, MoveResult>;
            simulationResult.v1 = i;
            simulationResult.v2 = GameSimulation.simulateMove(game, simulationResult.v1);
            this.ALL_CHECKS.forEach(impl => {
                // inputData.push(impl.check(game, simulationResult));
                score += impl.evaluate(game, simulationResult);
            });

            resultData.push(score);
        }

        inputData = inputData.concat(this.getGamefieldAsArray(game.gamefield));

        resultData = this.normalizeValues(resultData);
        this.trainingsData.v1.push(inputData);
        this.trainingsData.v2.push(resultData);
    }

    public static normalizeValues(results: number[]): number[] {
        let highest: number = 0;
        let lowest: number = 10;
        for (let i = 0; i < results.length; i++) {
            results[i] = results[i] < 0 ? 0 : results[i];
            highest = results[i] > highest ? results[i] : highest;
            lowest = results[i] < lowest ? results[i] : lowest;
        }

        for (let i = 0; i < results.length; i++) {
            if (highest === lowest) {
                results[i] = 1;
            } else {
                results[i] = (results[i] - lowest) / (highest - lowest);
            }
        }

        return results;
    }



    public static createInputArray(game: Game): number[] {
        let inputData: number[] = [];
        // for (let i = 0; i < 4; i++) {
        //     const simulationResult: Tuple2<Direction, MoveResult> = {} as Tuple2<Direction, MoveResult>;
        //     simulationResult.v1 = i;
        //     simulationResult.v2 = GameSimulation.simulateMove(game, simulationResult.v1);
        //     this.ALL_CHECKS.forEach(impl => {
        //         inputData.push(impl.check(game, simulationResult));
        //     });
        // }

        inputData = inputData.concat(this.getGamefieldAsArray(game.gamefield));
        return inputData;
    }

    public static calculateScoreBasedOnPrediction(game: Game, moveDirection: Direction) {
        const simulationResult: Tuple2<Direction, MoveResult> = {} as Tuple2<Direction, MoveResult>;
        simulationResult.v1 = moveDirection;
        simulationResult.v2 = GameSimulation.simulateMove(game, moveDirection);
        return this.calculateScore(game, simulationResult);
    }

    private static getGamefieldAsArray(gamefield: Field[][]): number[] {
        let result: number[] = [];
        for (let i = 0; i <= MAX_INDEX; i++) {
            for (let j = 0; j <= MAX_INDEX; j++) {
                const currentValue = VALUE_CONVERTER.get(gamefield[i][j]?.value);
                result.push(currentValue === undefined ? 0 : currentValue);
            }
        }
        result = this.normalizeValues(result);
        return result;
    }

    public static executeAllChecks(game: Game): number[] {
        let result: number[] = []

        for (let direction in Direction) {
            if (isNaN(Number(direction))) {
                continue;
            }
            const simulationResult: Tuple2<Direction, MoveResult> = {} as Tuple2<Direction, MoveResult>;
            simulationResult.v1 = Number(direction);
            simulationResult.v2 = GameSimulation.simulateMove(game, simulationResult.v1);
            this.ALL_CHECKS.forEach(impl => {
                result.push(impl.check(game, simulationResult));
            });
        }
        return result;
    }

    public static calculateScore(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number {
        let score = 0;
        this.ALL_CHECKS.forEach(impl => {
            const tempScore = impl.evaluate(game, simulationResult);
            // if (simulationResult.v1 === Direction.RIGHT) {
            //     console.log(`${impl.constructor.name}: ${tempScore}`);
            // }
            score += tempScore;
        })
        return score;
    }

}