import { MAX_INDEX } from '../../models/constants/constants';
import { Direction } from '../../models/enums/direction';
import { Field } from '../../models/field';
import { Game } from '../../models/game';
import { MoveResult } from '../../models/move-result';
import { Tuple2 } from '../../models/tuples/tuple2';
import { AbstractCheck } from './abstract-check';

export class NumberOfMergesCheck extends AbstractCheck {

    check(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number {
        const entriesBefore = this.countEntries(game.gamefield);
        const entriesAfter = this.countEntries(simulationResult.v2.game.gamefield);
        return (entriesBefore - entriesAfter) / 8;
    }

    evaluate(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number {
        return this.check(game, simulationResult) * 2;
    }

    private countEntries(gamefield: Field[][]): number {
        let count: number = 0;
        for (let i = 0; i <= MAX_INDEX; i++) {
            for (let j = 0; j <= MAX_INDEX; j++) {
                count += gamefield[i][j]?.value ? 1 : 0;
            }
        }
        return count;
    }

}