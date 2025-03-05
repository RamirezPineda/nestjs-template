export interface ResponseMessage<T> {
  statusCode?: number;
  message?: string | string[];
  error?: string;
  data?: T;
  total?: number;
}
