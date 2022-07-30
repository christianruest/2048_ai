import { Direction } from 'src/app/models/enums/direction';
import { Game } from 'src/app/models/game';
import { MoveResult } from 'src/app/models/move-result';
import { Tuple2 } from 'src/app/models/tuples/tuple2';
import { GameOverCheck } from '../../game-control/helper/game-over-check';
import { GAME_NOT_OVER, GAME_OVER } from '../../models/constants/constants';

export class AiGameOverCheck {

    public static check(game: Game, simulatedMove: Tuple2<Direction, MoveResult>): number {
        const gamefield = simulatedMove.v2.game.gamefield;
        return GameOverCheck.check(gamefield) === true ? GAME_OVER : GAME_NOT_OVER;
    }

}