import { Dispatch, SetStateAction } from 'react';

export interface Image {
  image_file: string | Blob;
  preview_URL: string;
}

export interface User {
  idx: number;
  email: string;
  nickname: string;
  gender?: string;
  birthday?: string;
  photo?: string;
}

export interface ProfileProps {
  loggedUser: User | undefined;
  setEditable: Dispatch<SetStateAction<boolean>>;
}
