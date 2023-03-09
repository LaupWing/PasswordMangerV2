export type FormElements<U extends string> = HTMLFormControlsCollection & Record<U, HTMLInputElement>

export interface AccountType {
   name: string
   password: string
   url: string
   username: string
   directories: string[]
} 