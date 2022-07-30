import { Component, HostListener } from '@angular/core';
import { AiService } from './ai/ai-service';
import { TrainingsDataHelper } from './ai/trainings-data-helper';
import { AutoPlayer } from './game-control/auto-player';
import { GameControl } from './game-control/game-control';
import { GameSimulation } from './game-control/game-simulation';
import {
  COLOUR_PICKER,
  DEMO_TIMEOUT_IN_MS
} from './models/constants/constants';
import { Direction } from './models/enums/direction';
import { KeyCode } from './models/enums/key-code';
import { Game } from './models/game';
import { MoveResult } from './models/move-result';
import { Tuple2 } from './models/tuples/tuple2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public currentGame: Game = {} as Game;
  public isGameOver: boolean = false;

  getBackgroundColour(value: number): string {
    if (value === null) {
      return '';
    }
    return COLOUR_PICKER.get(value);
  }


  constructor(
    private _aiService: AiService
  ) {
    this.currentGame = GameControl.start();
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.key) {
      case KeyCode.UP_ARROW:
        GameControl.move(this.currentGame, Direction.UP).then(result => {
          this.evaluateResult(result);
        });
        break;
      case KeyCode.DOWN_ARROW:
        GameControl.move(this.currentGame, Direction.DOWN).then(result => {
          this.evaluateResult(result);
        });
        break;
      case KeyCode.LEFT_ARROW:
        GameControl.move(this.currentGame, Direction.LEFT).then(result => {
          this.evaluateResult(result);
        });
        break;
      case KeyCode.RIGHT_ARROW:
        GameControl.move(this.currentGame, Direction.RIGHT).then(result => {
          this.evaluateResult(result);
        });
        break;
      case KeyCode.P:
        AutoPlayer.playAutomagically();
        break;
      case KeyCode.SPACE:
        if (this.isGameOver) {
          this.isGameOver = false;
          this.currentGame = GameControl.start();
        }
        break;
      case KeyCode.T:
        this._aiService.train();
        break;
      case KeyCode.D:
        this.demo();
        break;
      case KeyCode.S:
        console.log('this is where it is trained with predictions')
        break;
    }
  }

  private evaluateResult(result: MoveResult): void {
    this.updateUserInterface(result);
    this.getPrediction().then(res => {
      res.forEach(res => console.log(`Direction: ${Direction[res.v1]}: ${res.v2}`))
      console.log(TrainingsDataHelper.createInputArray(result.game, res[0].v1));
      console.log(TrainingsDataHelper.calculateScoreBasedOnPrediction(result.game, res[0].v1));
    });
  }

  private updateUserInterface(result: MoveResult) {
    this.currentGame.gamefield = result.game.gamefield;
    this.currentGame.score = result.game.score;
  }

  private getPrediction(): Promise<Tuple2<Direction, number>[]> {
    return new Promise(resolve => {
      const predictionResult: Tuple2<Direction, number>[] = [];
      let loopCount: number = 0;

      for (let direction in Direction) {
        if (isNaN(Number(direction))) {
          return;
        }

        this._aiService.predict(TrainingsDataHelper.createInputArray(this.currentGame, Number(direction))).then(prediction => {
          prediction.data().then(res => {
            let prediction = Array.from(res)[0];
            predictionResult.push({
              v1: Number(direction),
              v2: prediction
            } as Tuple2<Direction, number>);

            loopCount++;
            if (loopCount === 4) {
              predictionResult.sort((a, b) => b.v2 - a.v2)
              resolve(predictionResult)
            }
          })
        });
      }
    });
  }


  private demo() {
    this.isGameOver = false;
    this.currentGame = GameControl.start();
    let timerId = setInterval(() => {
      this.getPrediction().then(prediction => {
        let i: number = 0;
        while (GameSimulation.simulateMove(this.currentGame, prediction[i].v1).hasMoved === false) {
          console.warn('impossible move prediction');
          i++;
        }

        GameControl.move(this.currentGame, prediction[i].v1).then((result) => {
          this.currentGame = result.game;
          if (result.isGameOver) { //in move there is no new field, hence it will not be game over -> also to be checked in the simulated moves
            this.isGameOver = true;
            clearInterval(timerId);
          }
        });
      })
    }, DEMO_TIMEOUT_IN_MS);
  }

}
