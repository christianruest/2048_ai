import { Field } from "./field";

export interface Game {
    gamefield: Field[][];
    score: number;
    movesCount: number;
  }