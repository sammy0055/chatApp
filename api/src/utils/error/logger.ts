import { errorObject } from "../../types/errors";
import { errorData } from "../../data/error-data";

export const errorLogger = (statusCode: number): errorObject => {
  console.info(errorData[statusCode].message);
  return errorData[statusCode];
};
