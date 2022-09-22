export interface SignUpFormModel {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface SignInFormModel {
  email: string;
  password: string;
}

export interface AuthData {
  user: User;
  status: StatusCode;
}

export interface AuthResponse {
  token: string;
  status: number;
}

export enum StatusCode {
  Success = 1,
  Error = 0,
}

export interface User {
  email: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  statusCode: LoadingStatusCode | null;
}

export enum LoadingStatusCode {
  Loading = "-1",
  Error = "0",
  Success = "1",
}
