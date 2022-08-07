import { Injectable } from '@angular/core';
import { AiService } from '../ai/ai-service';
import { TrainingsDataHelper } from '../ai/trainings-data-helper';
import { GameControl } from '../game-control/game-control';
import { GameSimulation } from '../game-control/game-simulation';
import {
  DEFAULT_GAME_ITERATIONS,
  PARALLEL_GAMES,
  TIMEOUT_IN_MS
} from '../models/constants/constants';
import { Direction } from '../models/enums/direction';
import { Game } from '../models/game';

@Injectable()
export class AutoPlayer {

  constructor(private _aiService: AiService) {
  }

  private iterationNumber: number = 1;
  private sumOfMovesCount: number = 0;
  private sumOfScores: number = 0;

  public playAutomagically(smartMode: boolean, iterations?: number) {
    this.resetStatistics();
    let counter = 0;
    for (let i = 0; i < PARALLEL_GAMES && (iterations === undefined || i < iterations); i++) {
      this.playInstance(smartMode, iterations).then(() => {
        counter++;
        if (counter % 10 == 0 || (iterations !== undefined && counter === iterations) || counter === PARALLEL_GAMES) {
          console.log(`counter: ${counter}`);
        }
        if (iterations !== undefined && iterations < PARALLEL_GAMES && counter == iterations || counter == PARALLEL_GAMES) {
          const totalIterations = iterations === undefined ? DEFAULT_GAME_ITERATIONS : iterations;
          console.log(`Played ${totalIterations} in total`);
          console.log(`Average moves per game: ${this.sumOfMovesCount / totalIterations}`);
          console.log(`Average score: ${this.sumOfScores / totalIterations}`);
        }
      });
    }
  }

  private async playInstance(smartMode: boolean, iterations?: number): Promise<any> {
    if (this.iterationNumber % 10 == 0 || (iterations !== undefined && this.iterationNumber === iterations) || this.iterationNumber === DEFAULT_GAME_ITERATIONS) {
      console.log(`iteration: ${this.iterationNumber}`);
    }
    this.iterationNumber++;
    await this.playAndBlockFurtherExecution(smartMode);
    const totalIterations = iterations === undefined ? DEFAULT_GAME_ITERATIONS : iterations;
    if (this.iterationNumber <= totalIterations) {
      await this.playInstance(smartMode, iterations);
    } else {
      return;
    }
  }

  private async playAndBlockFurtherExecution(smartMode?: boolean): Promise<any> {
    return await new Promise((resolve) => {
      let game = GameControl.start();

      // game = this.playNumberOfMoves(game, this.getRandomInt(200))

      let timerId = setInterval(() => {
        this.getNextMove(smartMode, game).then(nextMove => {

          TrainingsDataHelper.addEntries(game);

          const result = GameControl.move(game, nextMove)
          game = result.game;
          if (result.isGameOver) { //break out if Game over
            this.sumOfMovesCount += result.game.movesCount;
            this.sumOfScores += result.game.score;
            clearInterval(timerId);
            resolve('');
          }
        });
      }, TIMEOUT_IN_MS);
    })
  }

  private async getNextMove(smartMode: boolean, currentGame: Game): Promise<Direction> {
    if (!smartMode) {
      return AutoPlayer.selectRandomNextMove();
    }

    const prediction = await this._aiService.getPrediction(currentGame)
    let i: number = 0;
    while (GameSimulation.simulateMove(currentGame, prediction[i].v1).hasMoved === false) {
      i++;
    }
    return prediction[i].v1;
  }

  private static playNumberOfMoves(game: Game, numberOfMoves: number): Game {
    for (let i = 1; i < numberOfMoves; i++) {
      const res = GameControl.move(game, this.selectRandomNextMove())
      game = res.game;
      if (res.isGameOver) {
        console.log(`oops, game over after ${i} plays and before training started`);
        this.playNumberOfMoves(GameControl.start(), numberOfMoves - 5);
      }
    }
    return game;
  }

  private static selectRandomNextMove(): Direction {
    return this.getRandomInt(4);
  }

  private static getRandomInt(upperbound: number): number {
    return Math.floor(Math.random() * upperbound)
  }

  private resetStatistics(): void {
    this.iterationNumber = 1;
    this.sumOfMovesCount = 0;
    this.sumOfScores = 0;
  }
}