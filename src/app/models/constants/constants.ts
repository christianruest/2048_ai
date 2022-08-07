import { Direction } from '../enums/direction';

/**
 * CHECK
 */
export const HIGHER_SCORE = 1;
export const SAME_SCORE = 0;
export const DID_MOVE = 1;
export const DID_NOT_MOVE = 0;

export const SUROUNDED_IN_CORNER = 0;
export const SUROUNDED_ON_EDGE = 0.25;
export const SUROUNDED_ON_GAMEFIELD = 0.75;
export const NOT_SUROUNDED = 1;

export const GAME_OVER = 0;
export const GAME_NOT_OVER = 1;

export const GREATEST_IN_CORNER = 1;
export const GREATEST_ON_EDGE = 0.5;
export const GREATEST_ON_GAMEFIELD = 0;

export const SAME_NEXT_TO_EACH_OTHER = 1;
export const NOT_SAME_NEXT_TO_EACH_OTHER = 0;

export const PREFERRED_DIRECTION = 1;
export const SECOND_PREFERRED_DIRECTION = 0.5;
export const OPPOSITE_PREFERRED_DIRECTION = 0;

/**
 * SCORES
 */
export const HIGHER_SCORE_SCORE = 0.7;
export const SAME_SCORE_SCORE = 0;
export const DID_MOVE_SCORE = 0.2;
export const DID_NOT_MOVE_SCORE = -3;

export const SUROUNDED_IN_CORNER_SCORE = -1;
export const SUROUNDED_ON_EDGE_SCORE = -0.3;
export const SUROUNDED_ON_GAMEFIELD_SCORE = 0.3;
export const NOT_SUROUNDED_SCORE = 0.5;

export const GAME_OVER_SCORE = -3;
export const GAME_NOT_OVER_SCORE = 0.1;

export const GREATEST_IN_CORNER_SCORE = 0.5;
export const GREATEST_ON_EDGE_SCORE = 0.3;
export const GREATEST_ON_GAMEFIELD_SCORE = -0.2;

export const SAME_NEXT_TO_EACH_OTHER_SCORE = 0.3;
export const NOT_SAME_NEXT_TO_EACH_OTHER_SCORE = 0;

export const PREFERRED_DIRECTION_SCORE = 0.5;
export const SECOND_PREFERRED_DIRECTION_SCORE = 0.2;
export const OPPOSITE_PREFERRED_DIRECTION_SCORE = -1;

/**
 * game constants
 */
export const DEFAULT_GAME_ITERATIONS: number = 1000;
export const PARALLEL_GAMES: number = 100;
export const EPOCHS: number = 1;
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

export const VALUE_CONVERTER: Map<number, number> = new Map([
    [2, 1],
    [4, 2],
    [8, 3],
    [16, 4],
    [32, 5],
    [64, 6],
    [128, 7],
    [256, 8],
    [512, 9],
    [1024, 10],
    [2048, 11]
]);

export const NEXT_MOVE_MAPPER: Map<number, Direction> = new Map([
    [0, Direction.LEFT],
    [1, Direction.UP],
    [2, Direction.RIGHT],
    [3, Direction.DOWN]
]);