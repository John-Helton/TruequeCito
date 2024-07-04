export interface interfaceLogin{
    email: string;
    password: string;
}

export interface interfaceRegister{
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export class User{
    id!:string;
    username!:string;
    email!:string;
    token!:string;
    role!:string;
}
export interface AuthResponse {
    token: string;
  }
  