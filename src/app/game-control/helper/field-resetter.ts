import { MAX_INDEX } from '../../models/constants/constants';
import { Field } from '../../models/field';

export class FieldResetter {
    public static reset(gamefield: Field[][]) {
        for (let i = 0; i <= MAX_INDEX; i++) {
            for (let j = 0; j <= MAX_INDEX; j++) {
                if (gamefield[i][j] !== null) {
                    gamefield[i][j].isAddable = true;
                }
            }
        }
    }
}