import { Game } from './game';
export interface MoveResult {
    hasMoved: boolean;
    game: Game;
    isGameOver: boolean;
}