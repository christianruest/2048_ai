import { HIGHER_SCORE, HIGHER_SCORE_SCORE, SAME_SCORE, SAME_SCORE_SCORE } from '../../models/constants/constants';
import { Direction } from '../../models/enums/direction';
import { Game } from '../../models/game';
import { MoveResult } from '../../models/move-result';
import { Tuple2 } from '../../models/tuples/tuple2';
import { AbstractCheck } from './abstract-check';

export class ScoreIncreasedCheck extends AbstractCheck {

    check(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number {
        return simulationResult.v2.game.score > game.score ?
            HIGHER_SCORE : SAME_SCORE;
    }

    evaluate(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number {
        // return simulationResult.v2.game.score - game.score;
        return simulationResult.v2.game.score > game.score ?
            HIGHER_SCORE_SCORE : SAME_SCORE_SCORE;
    }

}