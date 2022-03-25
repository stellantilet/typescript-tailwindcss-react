export interface User {
  _id: string
  name: string
  username: string
  email: string
  balance: number
}

export interface Product {
  _id: string
  name: string
  price: number
  quantity: number
}

export interface Receipt {
  user?: User
  product?: Product
  price: number
  quantity: number
  amount: number
}
