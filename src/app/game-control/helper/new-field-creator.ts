import {
    FIELDS,
    PERCENTAGE_4_TO_2
} from '../../models/constants/constants';
import { Field } from '../../models/field';

export class NewFieldCreator {
    public static create(gamefield: Field[][]) {
        let emptyFieldCount: number = 0;
        for (let i = 0; i < FIELDS; i++) {
            for (let j = 0; j < FIELDS; j++) {
                emptyFieldCount = gamefield[i][j] === null ? emptyFieldCount + 1 : emptyFieldCount;
            }
        }

        if (emptyFieldCount === 0) {
            console.error("GAME OVER");
            return;
        }

        let x = Math.floor(Math.random() * FIELDS);
        let y = Math.floor(Math.random() * FIELDS);
        if (gamefield[x][y] === null) {
            gamefield[x][y] = this.createNewFieldInstance();
        } else {
            NewFieldCreator.create(gamefield);
        }
    }

    private static createNewFieldInstance(): Field {
        const field: Field = {} as Field;
        field.value = Math.random() > PERCENTAGE_4_TO_2 ? 4 : 2;
        field.isAddable = true;
        return field;
    }
}