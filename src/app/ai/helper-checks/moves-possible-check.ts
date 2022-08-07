import { Tuple2 } from 'src/app/models/tuples/tuple2';
import { GameSimulation } from '../../game-control/game-simulation';
import { DID_MOVE, DID_MOVE_SCORE, DID_NOT_MOVE, DID_NOT_MOVE_SCORE } from '../../models/constants/constants';
import { Direction } from '../../models/enums/direction';
import { Game } from '../../models/game';
import { MoveResult } from '../../models/move-result';
import { AbstractCheck } from './abstract-check';

export class MovesPossibleCheck extends AbstractCheck {

    check(game: Game, simulationResult: Tuple2<Direction, MoveResult>) {
        return simulationResult.v2.hasMoved ? DID_MOVE : DID_NOT_MOVE;
    }

    evaluate(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number {
        let sim: MoveResult = GameSimulation.simulateMove(game, simulationResult.v1);
        return sim.hasMoved ? DID_MOVE_SCORE : DID_NOT_MOVE_SCORE
    }
}