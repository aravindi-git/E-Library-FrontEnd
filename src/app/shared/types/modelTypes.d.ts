declare type User  = {
  _id: string,
  name: string;
  userame: string;
  role: string;
  token: string;
  isExpired: boolean;
}

declare type LoginDetails ={
  username: string;
  role: string;
  password?: string;
}
