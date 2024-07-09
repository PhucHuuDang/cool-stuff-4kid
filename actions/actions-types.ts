export type RegisterProps = {
  fullName: string;
  userName: string;
  email: string;
  password: string;
};

export type LoginProps = {
  token: string;
  refreshToken: string;
  role: string;
};
