import { MAX_INDEX } from '../../models/constants/constants';
import { Field } from '../../models/field';

export class GameOverCheck {
    public static check(gamefield: Field[][]) {
        for (let i = 0; i <= MAX_INDEX - 1; i++) {
            for (let j = 0; j <= MAX_INDEX - 1; j++) {
                if (gamefield[i][j] === null
                    || gamefield[i + 1][j] === null
                    || gamefield[i][j + 1] === null
                    || gamefield[i + 1][j].value === gamefield[i][j].value
                    || gamefield[i][j + 1].value === gamefield[i][j].value) {
                    return false;
                }
            }
        }

        for (let i = 0; i <= MAX_INDEX - 1; i++) {
            if (gamefield[MAX_INDEX][i + 1] === null
                || gamefield[i + 1][MAX_INDEX] === null
                || gamefield[MAX_INDEX][i].value === gamefield[MAX_INDEX][i + 1].value
                || gamefield[i][MAX_INDEX].value === gamefield[i + 1][MAX_INDEX].value) {
                return false;
            }
        }

        return true;
    }
}