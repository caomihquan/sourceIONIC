export class ResponseModel {
  Error: any;
  ErrorLogin: any;
  ErrorCode: string;
  Data: DataResponse;

  private readIndex = 0;

  constructor(init?: Partial<Response>) {
    Object.assign(this, init);
  }

  read<T>(): T | null {
    let value = null;


    if (value) {
      return value as T;
    }

    return null;
  }

}
export class DataResponse {

}
