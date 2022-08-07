import * as _ from 'lodash';
import { Direction } from '../models/enums/direction';
import { Game } from '../models/game';
import { MoveResult } from '../models/move-result';
import { Tuple2 } from '../models/tuples/tuple2';
import { Move } from './helper/move';

export class GameSimulation {

    public static simulateAllDirections(game: Game): Tuple2<Direction, MoveResult>[] {
        let result: Tuple2<Direction, MoveResult>[] = [];
        for (let direction in Direction) {
            if (isNaN(Number(direction))) {
                continue;
            }
            let simulatedMove: Tuple2<Direction, MoveResult> = {} as Tuple2<Direction, MoveResult>;
            const simulationGame: Game = _.cloneDeep(game);
            simulatedMove.v1 = Number(direction);
            simulatedMove.v2 = this.simulateMove(simulationGame, Number(direction));
            result.push(simulatedMove);
        }
        return result;
    }



    /**
     * only simulate move
     * 
     * in contrary to move, no additional tasks, like add new field 
     * or reset all fields are executed
     * 
     * @param game 
     * @param direction 
     */
    public static simulateMove(game: Game, direction: Direction): MoveResult {
        const simulationMode: boolean = true;
        switch (direction) {
            case Direction.UP:
                return Move.up(game, simulationMode);
            case Direction.DOWN:
                return Move.down(game, simulationMode);
            case Direction.LEFT:
                return Move.left(game, simulationMode);
            case Direction.RIGHT:
                return Move.right(game, simulationMode);
        }
    }
}