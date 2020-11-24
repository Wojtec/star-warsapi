// Set userId to request interface

declare namespace Express {
  export interface Request {
    userId: string;
  }
}
