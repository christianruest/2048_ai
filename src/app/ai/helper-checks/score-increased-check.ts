import { HIGHER_SCORE, SAME_SCORE } from 'src/app/models/constants/constants';
import { MoveResult } from 'src/app/models/move-result';
import { Game } from '../../models/game';

export class ScoreIncreasedCheck {
    public static check(initialGame: Game, simulationResult: MoveResult): number {
        return simulationResult.game.score > initialGame.score ?
            HIGHER_SCORE : SAME_SCORE;

    }
}