import {
    MAX_INDEX,
    SUROUNDED_IN_CORNER,
    SUROUNDED_ON_EDGE,
    SUROUNDED_ON_GAMEFIELD,
    NOT_SUROUNDED
} from '../../models/constants/constants';
import { Field } from '../../models/field';

export class SuroundedByGreatersCheck {
    public static check(gamefield: Field[][]): number {
        if (gamefield[0][0] != null &&
            gamefield[0][1] != null &&
            gamefield[1][0] != null &&
            gamefield[0][0].value < gamefield[0][1].value &&
            gamefield[0][0].value < gamefield[1][0].value
            ||
            gamefield[MAX_INDEX][0] != null &&
            gamefield[MAX_INDEX][1] != null &&
            gamefield[MAX_INDEX - 1][0] != null &&
            gamefield[MAX_INDEX][0].value < gamefield[MAX_INDEX][1].value &&
            gamefield[MAX_INDEX][0].value < gamefield[MAX_INDEX - 1][0].value
            ||
            gamefield[0][MAX_INDEX] != null &&
            gamefield[0][MAX_INDEX - 1] != null &&
            gamefield[1][MAX_INDEX] != null &&
            gamefield[0][MAX_INDEX].value < gamefield[0][MAX_INDEX - 1].value &&
            gamefield[0][MAX_INDEX].value < gamefield[1][MAX_INDEX].value
            ||
            gamefield[MAX_INDEX][MAX_INDEX] != null &&
            gamefield[MAX_INDEX][MAX_INDEX - 1] != null &&
            gamefield[MAX_INDEX - 1][MAX_INDEX] != null &&
            gamefield[MAX_INDEX][MAX_INDEX].value < gamefield[MAX_INDEX][MAX_INDEX - 1].value &&
            gamefield[MAX_INDEX][MAX_INDEX].value < gamefield[MAX_INDEX - 1][MAX_INDEX].value
        ) {
            return SUROUNDED_IN_CORNER;
        }
        for (let i = 1; i <= MAX_INDEX - 1; i++) {
            if (gamefield[0][i] != null &&
                gamefield[0][i + 1] != null &&
                gamefield[0][i - 1] != null &&
                gamefield[1][i] != null &&
                gamefield[0][i].value < gamefield[0][i + 1].value &&
                gamefield[0][i].value < gamefield[0][i - 1].value &&
                gamefield[0][i].value < gamefield[1][i].value
                ||
                gamefield[MAX_INDEX][i] != null &&
                gamefield[MAX_INDEX][i + 1] != null &&
                gamefield[MAX_INDEX][i - 1] != null &&
                gamefield[MAX_INDEX - 1][i] != null &&
                gamefield[MAX_INDEX][i].value < gamefield[MAX_INDEX][i + 1].value &&
                gamefield[MAX_INDEX][i].value < gamefield[MAX_INDEX][i - 1].value &&
                gamefield[MAX_INDEX][i].value < gamefield[MAX_INDEX - 1][i].value
                ||
                gamefield[i][0] != null &&
                gamefield[i + 1][0] != null &&
                gamefield[i - 1][0] != null &&
                gamefield[i][1] != null &&
                gamefield[i][0].value < gamefield[i + 1][0].value &&
                gamefield[i][0].value < gamefield[i - 1][0].value &&
                gamefield[i][0].value < gamefield[i][1].value
                ||
                gamefield[i][MAX_INDEX] != null &&
                gamefield[i + 1][MAX_INDEX] != null &&
                gamefield[i - 1][MAX_INDEX] != null &&
                gamefield[i][MAX_INDEX - 1] != null &&
                gamefield[i][MAX_INDEX].value < gamefield[i + 1][MAX_INDEX].value &&
                gamefield[i][MAX_INDEX].value < gamefield[i - 1][MAX_INDEX].value &&
                gamefield[i][MAX_INDEX].value < gamefield[i][MAX_INDEX - 1].value
            ) {
                return SUROUNDED_ON_EDGE;
            }
            for (let i = 1; i <= MAX_INDEX - 1; i++) {
                for (let j = 1; j <= MAX_INDEX - 1; j++) {
                    if (gamefield[i][j] != null &&
                        gamefield[i - 1][j] != null &&
                        gamefield[i + 1][j] != null &&
                        gamefield[i][j - 1] != null &&
                        gamefield[i][j + 1] != null &&
                        gamefield[i][j].value < gamefield[i - 1][j].value &&
                        gamefield[i][j].value < gamefield[i + 1][j].value &&
                        gamefield[i][j].value < gamefield[i][j - 1].value &&
                        gamefield[i][j].value < gamefield[i][j + 1].value) {
                        return SUROUNDED_ON_GAMEFIELD;
                    }
                }
            }
        }
        return NOT_SUROUNDED;
    }
}