import { TrainingsDataHelper } from "./trainings-data-helper";

export class CsvHelperService {

  constructor() { }

  static exportCsv(inputData: number[][], result: number[]): string {
    if (inputData.length !== result.length) {
      console.error('number input data does not correspond to number of results');
      return '';
    }

    let rows: string[] = [];
    for (let i = 0; i < inputData.length; i++) {
      let val = inputData[i];
      val.push(result[i]);
      rows.push(val.join(','));
    }
    return rows.join('\n');
  }

  static importCsv(input: string) {
    let inputData: number[][] = [];
    let output: number[] = [];

    const rows: string[] = input.split('\n');
    for (let i = 0; i < rows.length; i++) {
      const values = rows[i].split(',');
      let data: number[] = [];
      for (let j = 0; j < values.length; j++) {
        if (j < values.length - 1) {
          data.push(Number(values[j]));
          if (j === values.length - 2) {
            inputData.push(data);
          }
        } else {
          output.push(Number(values[j]));
        }
      }
    }

    TrainingsDataHelper.setInput(inputData);
    TrainingsDataHelper.setOutput(output);
  }
}
