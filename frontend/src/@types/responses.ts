export interface SignUpResponse {
  stat: number;
  message: string;
};

export interface logInResponse {
  stat: number;
  message: string;
  token: string;
}

export interface PostResponse{
  message: string;
}
