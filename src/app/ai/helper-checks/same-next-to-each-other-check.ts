import { MAX_INDEX, NOT_SAME_NEXT_TO_EACH_OTHER, NOT_SAME_NEXT_TO_EACH_OTHER_SCORE, SAME_NEXT_TO_EACH_OTHER, SAME_NEXT_TO_EACH_OTHER_SCORE } from '../../models/constants/constants';
import { Direction } from '../../models/enums/direction';
import { Field } from '../../models/field';
import { Game } from '../../models/game';
import { MoveResult } from '../../models/move-result';
import { Tuple2 } from '../../models/tuples/tuple2';
import { AbstractCheck } from './abstract-check';

export class SameNextToEachOtherCheck extends AbstractCheck {

    readonly RESULT_SCORE_MAP: Map<number, number> = new Map<number, number>([
        [SAME_NEXT_TO_EACH_OTHER, SAME_NEXT_TO_EACH_OTHER_SCORE],
        [NOT_SAME_NEXT_TO_EACH_OTHER, NOT_SAME_NEXT_TO_EACH_OTHER_SCORE]
    ]);

    //TODO: wird so nicht-mergen belohnt??? zusätzlich: werden leere felder nicht beachtet.. bsp [[4] [ ] [4] [ ]]

    check(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number {
        const simulationGameField: Field[][] = simulationResult.v2.game.gamefield;
        for (let i = 0; i < MAX_INDEX; i++) {
            for (let j = 0; j < MAX_INDEX; j++) {
                if (simulationGameField[i][j]?.value === simulationGameField[i + 1][j]?.value || simulationGameField[i][j]?.value === simulationGameField[i][j + 1]?.value) {
                    return SAME_NEXT_TO_EACH_OTHER;
                }
            }
        }
        return NOT_SAME_NEXT_TO_EACH_OTHER;
    }

    evaluate(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number {
        const checkResult: number = this.check(game, simulationResult);
        const score = this.RESULT_SCORE_MAP.get(checkResult);
        if (Number.isNaN(score)) {
            console.warn('unexpected check result occured');
            return 0;
        }
        return Number(score);
    }

}