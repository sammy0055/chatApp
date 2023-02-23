export interface errorObject {
  [statusCode: number]: {
    code: string;
    message: string;
  };
}
