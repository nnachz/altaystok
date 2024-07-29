export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  password?: string; // Şifreyi isteğe bağlı yapabiliriz
  roles: Role[];
}
