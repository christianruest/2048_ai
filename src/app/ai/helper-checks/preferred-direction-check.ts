import { MAX_INDEX, OPPOSITE_PREFERRED_DIRECTION, OPPOSITE_PREFERRED_DIRECTION_SCORE, PREFERRED_DIRECTION, PREFERRED_DIRECTION_SCORE, SECOND_PREFERRED_DIRECTION, SECOND_PREFERRED_DIRECTION_SCORE } from '../../models/constants/constants';
import { Direction } from '../../models/enums/direction';
import { Game } from '../../models/game';
import { MoveResult } from '../../models/move-result';
import { Tuple2 } from '../../models/tuples/tuple2';
import { AbstractCheck } from './abstract-check';

export class PreferedDirectionCheck extends AbstractCheck {

    readonly RESULT_SCORE_MAP: Map<number, number> = new Map<number, number>([
        [PREFERRED_DIRECTION, PREFERRED_DIRECTION_SCORE],
        [SECOND_PREFERRED_DIRECTION, SECOND_PREFERRED_DIRECTION_SCORE],
        [OPPOSITE_PREFERRED_DIRECTION, OPPOSITE_PREFERRED_DIRECTION_SCORE]
    ]);

    check(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number {

        if (game.gamefield[0][0]?.value === undefined && simulationResult.v1 === Direction.LEFT) {
            return PREFERRED_DIRECTION;
        }

        let sideMoveMerges = 0;
        for (let i = 0; i < MAX_INDEX; i++) {
            let j = 1;
            while (game.gamefield[0][i + j]?.value === undefined && i + j < MAX_INDEX) {
                j++;
            }
            if (game.gamefield[0][i]?.value === game.gamefield[0][i + j]?.value) {
                sideMoveMerges++;
            }
        }
        let upMoveMerges = 0;
        for (let i = 0; i <= MAX_INDEX; i++) {
            let j = 1;
            while (game.gamefield[i][j]?.value === undefined && j < MAX_INDEX) {
                j++
            }
            if (game.gamefield[0][i]?.value === game.gamefield[0][j]?.value) {
                upMoveMerges++;
            }
        }
        if (simulationResult.v1 === Direction.UP && simulationResult.v2.hasMoved ||
            game.gamefield[0][0]?.value > simulationResult.v2.game.gamefield[0][0]?.value ||
            simulationResult.v1 === Direction.LEFT && sideMoveMerges > upMoveMerges) {
            return PREFERRED_DIRECTION;
        }

        if (simulationResult.v1 === Direction.LEFT && simulationResult.v2.hasMoved /* ||
            simulationResult.v1 === Direction.RIGHT && simulationResult.v2.hasMoved*/) {
            //add more check, like when first row is full then go right
            return SECOND_PREFERRED_DIRECTION;
        }
        return OPPOSITE_PREFERRED_DIRECTION;
    }

    evaluate(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number {
        return super.evaluateFromCheckResult(this.RESULT_SCORE_MAP, this.check(game, simulationResult));
    }

}