import * as _ from 'lodash';
import {
    FIELDS,
    MAX_INDEX
} from '../../models/constants/constants';
import { Direction } from '../../models/enums/direction';
import { Field } from '../../models/field';
import { Game } from '../../models/game';
import { MoveResult } from '../../models/move-result';
import { FieldResetter } from './field-resetter';
import { GameOverCheck } from './game-over-check';
import { NewFieldCreator } from './new-field-creator';

export class Move {
    public static up(inputGame: Game, isSimulation: boolean): MoveResult {
        let result: MoveResult = {} as MoveResult;
        result.hasMoved = false;
        let game = _.cloneDeep(inputGame);
        result.game = game;
        for (let j = 0; j <= MAX_INDEX; j++) {
            for (let i = 1; i <= MAX_INDEX; i++) {
                if (game.gamefield[i][j] !== null) {
                    let nextIndex = this.getNext(game.gamefield, i, j, Direction.UP);
                    if (game.gamefield[nextIndex][j] === null && nextIndex === 0) {
                        game.gamefield[nextIndex][j] = game.gamefield[i][j];
                        game.gamefield[i][j] = null;
                        result.hasMoved = true;
                    } else if (game.gamefield[nextIndex][j].value === game.gamefield[i][j].value && game.gamefield[nextIndex][j].isAddable === true) {
                        game.gamefield[nextIndex][j].value *= 2;
                        game.gamefield[nextIndex][j].isAddable = false;
                        game.gamefield[i][j] = null;
                        game.score += game.gamefield[nextIndex][j].value;
                        result.hasMoved = true;
                    } else if ((i - nextIndex) > 1) {
                        game.gamefield[nextIndex + 1][j] = game.gamefield[i][j];
                        game.gamefield[i][j] = null;
                        result.hasMoved = true;
                    }

                }
            }
        }
        Move.executeAfterMoveOperations(result, isSimulation);
        return result;
    }



    public static down(inputGame: Game, isSimulation: boolean): MoveResult {
        let result: MoveResult = {} as MoveResult;
        result.hasMoved = false;
        let game = _.cloneDeep(inputGame);
        result.game = game;
        for (let j = 0; j <= MAX_INDEX; j++) {
            for (let i = (MAX_INDEX - 1); i >= 0; i--) {
                if (game.gamefield[i][j] !== null) {
                    let nextIndex = this.getNext(game.gamefield, i, j, Direction.DOWN);
                    if (game.gamefield[nextIndex][j] === null && nextIndex === MAX_INDEX) {
                        game.gamefield[nextIndex][j] = game.gamefield[i][j];
                        game.gamefield[i][j] = null;
                        result.hasMoved = true;
                    } else if (game.gamefield[nextIndex][j].value === game.gamefield[i][j].value && game.gamefield[nextIndex][j].isAddable === true) {
                        game.gamefield[nextIndex][j].value *= 2;
                        game.gamefield[nextIndex][j].isAddable = false;
                        game.gamefield[i][j] = null;
                        game.score += game.gamefield[nextIndex][j].value;
                        result.hasMoved = true;
                    } else if ((nextIndex - i) > 1) {
                        game.gamefield[nextIndex - 1][j] = game.gamefield[i][j];
                        game.gamefield[i][j] = null;
                        result.hasMoved = true;
                    }

                }
            }
        }
        Move.executeAfterMoveOperations(result, isSimulation);
        return result;
    }

    public static left(inputGame: Game, isSimulation: boolean): MoveResult {
        let result: MoveResult = {} as MoveResult;
        result.hasMoved = false;
        let game = _.cloneDeep(inputGame);
        result.game = game;
        for (let i = 0; i <= MAX_INDEX; i++) {
            for (let j = 1; j <= MAX_INDEX; j++) {
                if (game.gamefield[i][j] !== null) {
                    let nextIndex = this.getNext(game.gamefield, i, j, Direction.LEFT);
                    if (game.gamefield[i][nextIndex] === null && nextIndex === 0) {
                        game.gamefield[i][nextIndex] = game.gamefield[i][j];
                        game.gamefield[i][j] = null;
                        result.hasMoved = true;
                    } else if (game.gamefield[i][nextIndex].value === game.gamefield[i][j].value && game.gamefield[i][nextIndex].isAddable === true) {
                        game.gamefield[i][nextIndex].value *= 2;
                        game.gamefield[i][nextIndex].isAddable = false;
                        game.gamefield[i][j] = null;
                        game.score += game.gamefield[i][nextIndex].value;
                        result.hasMoved = true;
                    } else if ((j - nextIndex) > 1) {
                        game.gamefield[i][nextIndex + 1] = game.gamefield[i][j];
                        game.gamefield[i][j] = null;
                        result.hasMoved = true;
                    }

                }
            }
        }
        Move.executeAfterMoveOperations(result, isSimulation);
        return result;
    }

    public static right(inputGame: Game, isSimulation: boolean): MoveResult {
        let result: MoveResult = {} as MoveResult;
        result.hasMoved = false;
        let game = _.cloneDeep(inputGame);
        result.game = game;
        for (let i = 0; i < FIELDS; i++) {
            for (let j = (MAX_INDEX - 1); j >= 0; j--) {
                if (game.gamefield[i][j] !== null) {
                    let nextIndex = this.getNext(game.gamefield, i, j, Direction.RIGHT);
                    if (game.gamefield[i][nextIndex] === null && nextIndex === MAX_INDEX) {
                        game.gamefield[i][nextIndex] = game.gamefield[i][j];
                        game.gamefield[i][j] = null;
                        result.hasMoved = true;
                    } else if (game.gamefield[i][nextIndex].value === game.gamefield[i][j].value && game.gamefield[i][nextIndex].isAddable === true) {
                        game.gamefield[i][nextIndex].value *= 2;
                        game.gamefield[i][nextIndex].isAddable = false;
                        game.gamefield[i][j] = null;
                        game.score += game.gamefield[i][nextIndex].value;
                        result.hasMoved = true;
                    } else if ((nextIndex - j) > 1) {
                        game.gamefield[i][nextIndex - 1] = game.gamefield[i][j];
                        game.gamefield[i][j] = null;
                        result.hasMoved = true;
                    }

                }
            }
        }
        Move.executeAfterMoveOperations(result, isSimulation);
        return result;
    }

    private static getNext(gamefield: Field[][], rowIndex: number, columnIndex: number, direction: Direction) {
        let nextIndex;
        switch (direction) {
            case Direction.UP:
                nextIndex = rowIndex - 1;
                while (nextIndex > 0 && gamefield[nextIndex][columnIndex] === null) {
                    nextIndex--;
                }
                return nextIndex;
            case Direction.LEFT:
                nextIndex = columnIndex - 1;
                while (nextIndex > 0 && gamefield[rowIndex][nextIndex] === null) {
                    nextIndex--;
                }
                return nextIndex;
            case Direction.DOWN:
                nextIndex = rowIndex + 1;
                while (nextIndex < MAX_INDEX && gamefield[nextIndex][columnIndex] === null) {
                    nextIndex++;
                }
                return nextIndex;
            case Direction.RIGHT:
                nextIndex = columnIndex + 1;
                while (nextIndex < MAX_INDEX && gamefield[rowIndex][nextIndex] === null) {
                    nextIndex++;
                }
                return nextIndex;
        }
    }

    private static executeAfterMoveOperations(result: MoveResult, isSimulation: boolean) {
        const gameField: Field[][] = isSimulation ? _.cloneDeep(result.game.gamefield) : result.game.gamefield;
        if (result.hasMoved) {
            this.createNewFieldAndReset(gameField);
            result.game.movesCount++;
        }
        result.isGameOver = GameOverCheck.check(gameField);
    }

    private static createNewFieldAndReset(gamefield: Field[][]): void {
        NewFieldCreator.create(gamefield);
        FieldResetter.reset(gamefield);
    }
}