import {
    FIELDS
} from '../models/constants/constants';
import { Direction } from '../models/enums/direction';
import { Game } from '../models/game';
import { MoveResult } from '../models/move-result';
import { Move } from './helper/move';
import { NewFieldCreator } from './helper/new-field-creator';

export class GameControl {

    public static start(): Game {
        const newGame: Game = {} as Game;
        newGame.score = 0;
        newGame.gamefield = [];
        for (let i = 0; i < FIELDS; i++) {
            newGame.gamefield.push([]);
            for (let j = newGame.gamefield[i].length; j < FIELDS; j++) {
                newGame.gamefield[i].push(null);
            }
        }
        NewFieldCreator.create(newGame.gamefield);
        newGame.movesCount = 0;
        return newGame;
    }

    /**
     * executes move, then adds new field, resets all fields and checks if game is over
     * @param game 
     * @param direction 
     */
    public static move(game: Game, direction: Direction): Promise<MoveResult> {
        return new Promise(resolve => {
            let result: MoveResult;

            switch (direction) {
                case Direction.UP:
                    result = Move.up(game);
                    break;
                case Direction.DOWN:
                    result = Move.down(game);
                    break;
                case Direction.LEFT:
                    result = Move.left(game);
                    break;
                case Direction.RIGHT:
                    result = Move.right(game);
                    break;
            }
            resolve(result);
        })

    }




}