export interface IApp {
  loggedUser?: IAdmin | undefined
}

export interface IMessage {
  name: string 
  number: number 
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

export interface IUser {
  name: string
  email: string
  phone: number 
  img__url: string 
  role: string 
}

export interface IAdmin extends IUser { 
  role: 'admin' 
  token: string 
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
  createdAt: Date
  location: {
    apartment: string
    entrace: string
    block: number
    building: number
  }
  products: {
    price: number
    productID: string
    quantity: number
    _id: string
  }[]
  state: 'sent' | 'complete' | 'active'
  total: number
  user: {
    id: string 
    img__url: string 
    name: string
    phone: number
  }
  _id: string  
}