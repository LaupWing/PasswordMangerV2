export type FormElements<U extends string> = HTMLFormControlsCollection & Record<U, HTMLInputElement>

export interface PasswordType {
   name: string
   password: string
   url: string
   username
} 