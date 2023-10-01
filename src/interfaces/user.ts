export interface IUser {
  firstName: string;
  lastName: string;
  emailOrPhone: string;
  password: string;
}

export type PublicUser = Omit<IUser, "password">
