export interface User {
  name: string;
  email: string;
  password: string;
  profilePictureUrl?: string;
}

export interface Message {
  chatId: string;
  content: string;
}
