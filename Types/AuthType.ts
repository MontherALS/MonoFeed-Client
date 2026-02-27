export type SignUpType = {
  user_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type LoginType = {
  email: string;
  password: string;
};
export type LogInUserDataType = {
  userData: {
    id: string;
    user_name: string;
    email: string;
    createdAt: Date;
  };
};
