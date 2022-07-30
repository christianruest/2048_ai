import { TrainingsDataHelper } from '../ai/trainings-data-helper';
import { GameControl } from '../game-control/game-control';
import { GameSimulation } from '../game-control/game-simulation';
import {
  GAME_ITERATIONS,
  PARALLEL_GAMES,
  TIMEOUT_IN_MS
} from '../models/constants/constants';
import { Direction } from '../models/enums/direction';
import { Game } from '../models/game';

export class AutoPlayer {
  private static iterationNumber: number = 1;

  public static playAutomagically() {
    this.iterationNumber = 1;
    for (let i = 0; i < PARALLEL_GAMES; i++) {
      this.playInstance();
    }
  }

  private static playInstance() {
    this.iterationNumber++;
    if (this.iterationNumber % 100 == 0) {
      console.log(this.iterationNumber);
    }
    this.playAndBlockFurtherExecution().then(() => {
      if (this.iterationNumber <= GAME_ITERATIONS) {
        this.playInstance();
      }
    });
  }

  private static playAndBlockFurtherExecution() {
    return new Promise((resolve) => {
      let game = GameControl.start();

      // game = this.playNumberOfMoves(game, this.getRandomInt(200))

      let timerId = setInterval(() => {
        let nextMove: Direction = this.selectRandomNextMove();
        TrainingsDataHelper.addEntries(game, nextMove);

        GameControl.move(game, nextMove).then(result => {
          game = result.game;
          if (result.isGameOver) { //break out if Game over
            clearInterval(timerId);
            resolve('');
          }
        });
      }, TIMEOUT_IN_MS);
    })
  }

  private static playNumberOfMoves(game: Game, numberOfMoves: number): Game {
    for (let i = 1; i < numberOfMoves; i++) {
      GameControl.move(game, this.selectRandomNextMove()).then(res => {
        game = res.game;
        if (res.isGameOver) {
          console.log(`oops, game over after ${i} plays and before training started`);
          this.playNumberOfMoves(GameControl.start(), numberOfMoves - 5);
        }
      });
    }
    return game;
  }

  private static selectRandomNextMove(): Direction {
    return this.getRandomInt(4);
  }

  private static getRandomInt(upperbound: number): number {
    return Math.floor(Math.random() * upperbound)
  }
}