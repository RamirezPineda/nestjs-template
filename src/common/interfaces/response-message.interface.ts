export interface ResponseMessage<T> {
  status: number;
  message?: string | string[];
  error?: string;
  data?: T;
  total?: number;
}
