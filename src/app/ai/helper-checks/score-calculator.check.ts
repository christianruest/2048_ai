import { DID_NOT_MOVE_SCORE, GAME_OVER, PREFERRED_DIRECTION } from '../../models/constants/constants';
import { Game } from '../../models/game';
import { MoveResult } from '../../models/move-result';
import { Direction } from '../../models/enums/direction';
import { Tuple2 } from '../../models/tuples/tuple2';
import { SuroundedByGreatersCheck } from './surounded-by-greaters-check';

export class ScoreCalculatorCheck {
    public static check(initialGame: Game, simulationResult: Tuple2<Direction, MoveResult>): number {
        if (simulationResult.v2.isGameOver) {
            return GAME_OVER;
        }

        if (!simulationResult.v2.hasMoved) {
            return DID_NOT_MOVE_SCORE;
        }

        let score: number = 0.5
        score += SuroundedByGreatersCheck.check(simulationResult.v2.game.gamefield);
        score += (simulationResult.v2.game.score - initialGame.score) / 10;
        score += simulationResult.v1 == Direction.DOWN ? PREFERRED_DIRECTION : 0;
        return score;
    }
}