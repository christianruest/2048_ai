import { GREATEST_IN_CORNER, GREATEST_IN_CORNER_SCORE, GREATEST_ON_EDGE, GREATEST_ON_EDGE_SCORE, GREATEST_ON_GAMEFIELD, GREATEST_ON_GAMEFIELD_SCORE, MAX_INDEX } from '../../models/constants/constants';
import { Direction } from '../../models/enums/direction';
import { Field } from '../../models/field';
import { Game } from '../../models/game';
import { MoveResult } from '../../models/move-result';
import { Tuple2 } from '../../models/tuples/tuple2';
import { AbstractCheck } from './abstract-check';

export class GreatestOnEdgeCheck extends AbstractCheck {

    readonly RESULT_SCORE_MAP: Map<number, number> = new Map<number, number>([
        [GREATEST_IN_CORNER, GREATEST_IN_CORNER_SCORE],
        [GREATEST_ON_EDGE, GREATEST_ON_EDGE_SCORE],
        [GREATEST_ON_GAMEFIELD, GREATEST_ON_GAMEFIELD_SCORE]
    ]);

    check(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number {
        const simultaionGamefield: Field[][] = simulationResult.v2.game.gamefield;
        let greatestValue = 0;
        for (let i = 0; i <= MAX_INDEX; i++) {
            for (let j = 0; j <= MAX_INDEX; j++) {
                const fieldValue = simultaionGamefield[i][j]?.value;
                greatestValue = fieldValue === undefined || greatestValue > fieldValue ? greatestValue : fieldValue;
            }
        }

        if (simultaionGamefield[0][0]?.value === greatestValue ||
            simultaionGamefield[0][MAX_INDEX]?.value === greatestValue ||
            simultaionGamefield[MAX_INDEX][0]?.value === greatestValue ||
            simultaionGamefield[MAX_INDEX][MAX_INDEX]?.value === greatestValue) {
            return GREATEST_IN_CORNER;
        }

        for (let i = 1; i < MAX_INDEX - 1; i++) {
            if (simultaionGamefield[i][0]?.value === greatestValue ||
                simultaionGamefield[i][MAX_INDEX]?.value === greatestValue ||
                simultaionGamefield[0][i]?.value === greatestValue ||
                simultaionGamefield[MAX_INDEX][i]?.value === greatestValue) {
                return GREATEST_ON_EDGE;
            }
        }

        return GREATEST_ON_GAMEFIELD;
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