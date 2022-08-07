import { TrainingsDataHelper } from "./trainings-data-helper";

export class CsvHelperService {

  constructor() { }

  public static exportTrainingData() {
    const csvContent = CsvHelperService.exportCsv();
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = Date.now() + '.csv';
    hiddenElement.click();
  }

  public static importTrainingData(input: string) {
    CsvHelperService.importCsv(input);
  }

  private static exportCsv(): string {
    const inputData: number[][] = TrainingsDataHelper.getInput()
    const result: number[][] = TrainingsDataHelper.getOutput()

    if (inputData.length !== result.length) {
      console.error('number input data does not correspond to number of results');
      return '';
    }

    let rows: string[] = [];
    for (let i = 0; i < inputData.length; i++) {
      let val = inputData[i];
      val = val.concat(result[i]);
      rows.push(val.join(','));
    }
    return rows.join('\n');
  }

  private static importCsv(input: string) {
    let inputData: number[][] = [];
    let output: number[][] = [];

    const rows: string[] = input.split('\n');
    for (let i = 0; i < rows.length; i++) {
      const values = rows[i].split(',');
      let dataIn: number[] = [];
      let dataRes: number[] = [];
      for (let j = 0; j < values.length; j++) {
        if (j < values.length - 1) {
          dataIn.push(Number(values[j]));
          if (j === values.length - 5) {
            inputData.push(dataIn);
          }
        } else {
          dataRes.push(Number(values[j]));
          if (j === values.length - 1) {
            output.push(dataRes);
          }
        }
      }
    }

    TrainingsDataHelper.setInput(inputData);
    TrainingsDataHelper.setOutput(output);
  }
}
