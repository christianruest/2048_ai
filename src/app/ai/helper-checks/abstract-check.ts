
import { Direction } from 'src/app/models/enums/direction';
import { MoveResult } from 'src/app/models/move-result';
import { Tuple2 } from 'src/app/models/tuples/tuple2';
import { Game } from '../../models/game';

export abstract class AbstractCheck {
    abstract check(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number;
    abstract evaluate(game: Game, simulationResult: Tuple2<Direction, MoveResult>): number;

    evaluateFromCheckResult(resultScoreMap: Map<number, number>, checkResult: number) {
        const score = resultScoreMap.get(checkResult);
        if (Number.isNaN(score)) {
            console.warn('unexpected check result occured');
            return 0;
        }
        return Number(score);
    }
}