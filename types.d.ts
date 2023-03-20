export type FormElements<U extends string> = HTMLFormControlsCollection & Record<U, HTMLInputElement>

export interface AccountType {
   name: string
   password: string
   id?: string
   url: string
   username: string
   directories: string[]
   is_favorite: boolean
} 

export interface DirectoryType {
   id?: string
   name: string
}

export interface SecretKey {
   iv: string
   timestamp: number
   secret: string
}