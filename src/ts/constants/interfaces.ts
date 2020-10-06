export interface IApp {
  loggedUser?: IAdmin | undefined
}

export interface IAdmin {
  name: string
  email: string
  phone: number 
  token: string 
  img__url: string 
  role: string 
}

export interface AdminLogin {
  email: string,
  password: string
}

export interface IAuthRes<T> {
  status: string,
  token: string,
  data: {
    user: T
  }
}