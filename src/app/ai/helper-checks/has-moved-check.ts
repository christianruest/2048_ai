import { Game } from 'src/app/models/game';
import { DID_MOVE, DID_NOT_MOVE } from '../../models/constants/constants';
import { MoveResult } from '../../models/move-result';

export class HasMovedCheck {
    public static check(initialGame: Game, simulationResult: MoveResult): number {
        return simulationResult.hasMoved ? DID_MOVE : DID_NOT_MOVE;
    }
}