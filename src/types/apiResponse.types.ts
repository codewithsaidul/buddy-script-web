export interface IApiResponse<T> {
  statusCode: number
  success: boolean
  message: string
  meta?: IMeta
  data: T
}

export interface IMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}


export interface IApiErrorResponse {
  status: number
  data: IERROR
}

export interface IERROR {
  success: boolean
  message: string
  err: Err
  stack: string
}

export interface Err {
  name: string
  message: string
}