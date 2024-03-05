
export type AppDataState = {
  allUsers: ApiResponseUsers;
  positions: ApiResponsePositions;
  newUser: NewUser;
}

export type StoreState = {
  appData: AppDataState,
}

export type Links = {
  next_url: string | null;
  prev_url: string | null;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: number;
  photo: string;
};

export type ApiResponseUsers = {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: Links;
  users: User[];
};

export type Position = {
  id: number;
  name: string;
};

export type ApiResponsePositions = {
  success: boolean;
  positions: Position[]
}

export type ApiResponseToken = {
  success: boolean;
  token: string
}

export type ApiResponseAddUser = {
  success: boolean;
  user_id?: number
  message: string
  fails?: any
}

export type FormFromLib = {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: FileList | null;
};


export type Form = {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: File | null;
};

export type NewUser = {
  success: boolean;
  user_id?: number;
  message: string;
}
