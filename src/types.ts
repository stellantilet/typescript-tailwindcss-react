export interface User {
  _id: string
  name: string
  username: string
  email: string
  balance: number
  receipts?: Receipt[]
}

export interface Product {
  _id: string
  name: string
  price: number
  quantity: number
}

export interface Receipt {
  _id: string
  user?: User
  product?: Product
  price: number
  quantity: number
  amount: number
  updatedAt: string
}
