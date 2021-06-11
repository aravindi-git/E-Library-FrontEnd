declare type User  = {
  _id: string,
  name: string;
  userame: string;
  role: string;
  token: string;
  isExpired: boolean;
  isActive: boolean;
}

declare type LoginDetails ={
  username: string;
  role: string;
  password?: string;
}

declare type UserRole ={
  text: string;
  value: string;
}
