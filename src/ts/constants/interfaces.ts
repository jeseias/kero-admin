export interface IApp {
  loggedUser?: IAdmin | undefined
}

export interface IMessage {
  name: string 
  email: string 
  phone: number 
  message: string  
}

export interface IProject {
  category: string
  createdAt: string
  id: string
  imageCover: string
  images: string[]
  img__url: string
  name: string
  price: number
  subCategory: string
  summary: string
  top: boolean
  updatedAt: string
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

export interface IOrder {
  createdAt: string
  location: {
    apartment: string
    entrace: string
    block: number
    building: number
  }
  products: {
    price: number
    productID: string
    _id: string
  }[]
  state: 'sent' | 'complete' | 'active'
  total: number
  user: string
  _id: string 
}