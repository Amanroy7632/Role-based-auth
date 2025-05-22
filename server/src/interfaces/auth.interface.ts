export interface ILogin {
  email: string;
  password: string;
}
export interface ILoginResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  token:{
    accessToken:string;
    refreshToken:string;
  }
}
