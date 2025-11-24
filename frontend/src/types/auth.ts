
export type User = {
  id: string;
  uid?: string | null;
  email: string;
  name?: string | null;
  businessName?: string | null;
  officeAddress?: string | null;
  postCode?: string | null;
  profileImage?: string | null;
  createdAt?: string;
  status?: string | null;
};

export type AuthData = {
  token: string;
  user: User;
  status?: string;
};

export type ApiSuccess<T = any> = {
  statusCode: number;
  success: true;
  data: T;
};

export type ApiError = {
  statusCode: number;
  success: false;
  error: string;
};
