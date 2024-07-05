export interface interfaceLogin {
  email: string;
  password: string;
}

export interface interfaceRegister {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export class User {
  id!: string;
  username!: string;
  email!: string;
  password?: string; // Optional for profile update
  avatar?: string;
  token!: string;
  role!: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username?: string;
    avatar?: string;
    // Add any other properties here if needed
  };
}
