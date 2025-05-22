export default class ApiResponse {
  public readonly statusCode: number;
  public readonly data: any;
  public readonly message?: string;

  constructor(statusCode: number, data: any, message?: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message || "success";
  }
}
