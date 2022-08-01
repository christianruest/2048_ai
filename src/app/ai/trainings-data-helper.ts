import { GameSimulation } from '../game-control/game-simulation';
import {
    MAX_INDEX
} from '../models/constants/constants';
import { Direction } from '../models/enums/direction';
import { Field } from '../models/field';
import { Game } from '../models/game';
import { MoveResult } from '../models/move-result';
import { Tuple2 } from '../models/tuples/tuple2';
import { CsvHelperService } from './csv-helper.service';
import { AiGameOverCheck } from './helper-checks/ai-game-over-check';
import { HasMovedCheck } from './helper-checks/has-moved-check';
import { ScoreCalculatorCheck } from './helper-checks/score-calculator.check';
import { ScoreIncreasedCheck } from './helper-checks/score-increased-check';
import { SuroundedByGreatersCheck } from './helper-checks/surounded-by-greaters-check';

export class TrainingsDataHelper {
    private static trainingsData: Tuple2<number[][], number[]> = {} as Tuple2<number[][], number[]>;

    public static getInput(): number[][] {
        return this.trainingsData.v1;
    }


    public static setInput(input: number[][]) {
        this.trainingsData.v1 = input;
    }

    public static getOutput(): number[] {
        return this.trainingsData.v2;
    }

    public static setOutput(output: number[]): void {
        this.trainingsData.v2 = output;
    }

    public static exportTrainingData() {
        const csvContent = CsvHelperService.exportCsv(this.getInput(), this.getOutput());
        const hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
        hiddenElement.target = '_blank';
        hiddenElement.download = Date.now() + '.csv';
        hiddenElement.click();
    }

    public static importTrainingData(input: string) {
        CsvHelperService.importCsv(input);
    }

    public static resetEntries() {
        this.trainingsData.v1 = [];
        this.trainingsData.v2 = [];
    }

    public static addEntries(game: Game, moveDirection: Direction): void {
        let trainingsInput: number[] = this.createInputArray(game, moveDirection);
        if (this.trainingsData.v1 === undefined) {
            this.trainingsData.v1 = [];
        }
        this.trainingsData.v1.push(trainingsInput);
        const simulationResult: Tuple2<Direction, MoveResult> = {} as Tuple2<Direction, MoveResult>;
        simulationResult.v1 = moveDirection;
        simulationResult.v2 = GameSimulation.simulateMove(game, moveDirection);
        this.addScore(this.calculateScore(game, simulationResult));
    }

    public static addScore(score: number): void {
        if (this.trainingsData.v2 === undefined) {
            this.trainingsData.v2 = [];
        }
        this.trainingsData.v2.push(score);
    }

    public static createInputArray(game: Game, moveDirection: Direction) {
        let trainingsInput: number[] = [];
        trainingsInput = trainingsInput.concat(this.normalizeDirection(moveDirection));
        // trainingsInput = trainingsInput.concat(this.getGamefieldAsArray(game.gamefield));
        const simulationResult: Tuple2<Direction, MoveResult> = {} as Tuple2<Direction, MoveResult>;
        simulationResult.v1 = moveDirection;
        simulationResult.v2 = GameSimulation.simulateMove(game, moveDirection);
        trainingsInput = trainingsInput.concat(this.executeAllChecks(game, simulationResult));
        return trainingsInput;
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
                const currentValue = gamefield[i][j];
                result.push(currentValue === null ? 0 : currentValue.value / 2048);
            }
        }
        return result;
    }

    public static executeAllChecks(game: Game, simulatedMove: Tuple2<Direction, MoveResult>): number[] {
        let result: number[] = []
        result.push(HasMovedCheck.check(game, simulatedMove.v2));
        result.push(ScoreIncreasedCheck.check(game, simulatedMove.v2));
        result.push(AiGameOverCheck.check(game, simulatedMove));
        result.push(SuroundedByGreatersCheck.check(simulatedMove.v2.game.gamefield));
        return result;
    }

    public static calculateScore(game: Game, simulatedMove: Tuple2<Direction, MoveResult>): number {
        return ScoreCalculatorCheck.check(game, simulatedMove);
    }

    public static normalizeDirection(direction: number): number {
        return direction / 3;
    }

    public static denormalizeDirection(direction: number): number {
        return Math.round(direction * 3);
    }
}