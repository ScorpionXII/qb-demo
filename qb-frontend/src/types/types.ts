export interface AuthUser {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  content: {
    loggedUser: string;
  }
}

export interface MixedContact {
  name: string;
  email: string;
  githubUser: string;
  githubLocation: string;
  githubId: number;
  freshdeskTimeZone: string;
  freshdeskId: number;
  __v: number;
  _id: string;
}
