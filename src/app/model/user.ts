/**
 * Represents a registered user
 */
export interface User {
  id: string;
  email: string;
  password: string;
}

/**
 * Represents the credentials used to log in or register a new user
 */
export interface Credentials {
  email: string;
  password: string;
}
