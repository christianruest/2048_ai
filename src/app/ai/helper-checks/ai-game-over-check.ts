import { GameOverCheck } from '../../game-control/helper/game-over-check';
import { GAME_NOT_OVER, GAME_NOT_OVER_SCORE, GAME_OVER, GAME_OVER_SCORE } from '../../models/constants/constants';
import { Direction } from '../../models/enums/direction';
import { Game } from '../../models/game';
import { MoveResult } from '../../models/move-result';
import { Tuple2 } from '../../models/tuples/tuple2';
import { AbstractCheck } from './abstract-check';

export class AiGameOverCheck extends AbstractCheck {

    check(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number {
        const gamefield = simulationResult.v2.game.gamefield;
        return GameOverCheck.check(gamefield) === true ? GAME_OVER : GAME_NOT_OVER;
    }

    evaluate(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number {
        const gamefield = simulationResult.v2.game.gamefield;
        return GameOverCheck.check(gamefield) === true ? GAME_OVER_SCORE : GAME_NOT_OVER_SCORE;
    }

}