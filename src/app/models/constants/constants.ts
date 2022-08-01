import { Direction } from '../enums/direction';

/**
 * weights
 */
export const HIGHER_SCORE = 1;
export const SAME_SCORE = -1;
export const DID_MOVE = 1;
export const DID_NOT_MOVE = -1;
export const DID_NOT_MOVE_SCORE = -1;

export const SUROUNDED_IN_CORNER = -0.5;
export const SUROUNDED_ON_EDGE = -0.2;
export const SUROUNDED_ON_GAMEFIELD = -0.1;
export const NOT_SUROUNDED = 0;

export const GAME_OVER = -1;
export const GAME_NOT_OVER = 1;

export const PREFERRED_DIRECTION = 0.3;

/**
 * game constants
 */
export const DEFAULT_GAME_ITERATIONS: number = 1000;
export const PARALLEL_GAMES: number = 100;
export const EPOCHS: number = 3;
export const PERCENTAGE_4_TO_2: number = 0.62;
export const FIELDS: number = 4;
export const MAX_INDEX: number = FIELDS - 1;
export const DEMO_TIMEOUT_IN_MS: number = 150;
export const TIMEOUT_IN_MS: number = 1;
export const FIELD_NORMALIZER = 2048;

export const COLOUR_PICKER: Map<number, string> = new Map([
    [2, '#ebe52d'],
    [4, '#ebcb2d'],
    [8, '#ebaf2d'],
    [16, '#eb8f2d'],
    [32, '#eb6c2d'],
    [64, '#eb3d2d'],
    [128, '#2de2eb'],
    [256, '#2d9ceb'],
    [512, '#2d66eb'],
    [1024, '#c82deb'],
    [2048, '#2deb4a']
]);

export const NEXT_MOVE_MAPPER: Map<number, Direction> = new Map([
    [0, Direction.LEFT],
    [1, Direction.UP],
    [2, Direction.RIGHT],
    [3, Direction.DOWN]
]);