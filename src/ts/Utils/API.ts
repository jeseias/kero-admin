import App from '../App'
import api from '../services/api'
import { alertUser } from '../models/Alert'
import { getUserToken } from '../models/Auth'

import { AxiosResponse } from 'axios'
 
const fecthData: (route: string, token?: string) => Promise<any> =
  async (route, token) => {
    try {

      let res: AxiosResponse

      if (token) {
        res = await api.get(route, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })

        const { status, data: {  docs, doc } } = res.data

        if (status === 'success') { 
          return docs || doc
        }
      } else {
        res = await api.get(route)
        const { status, data: {  docs, doc  } } = res.data
        if (status === 'success') { 
          return docs || doc
        }
      } 
    } catch (err) {
      if (err.response) {
        alertUser(false, err.response.data.message)
      } else {
        alertUser(false, err.message)
      }
    }
  }

const deleteData: (route: string, msg: string) => Promise<void> =
  async (route, msg) => {
    try {
      const userToken = getUserToken()
      const res = await api.delete(route, {
        headers: {
          authorization: `Bearer ${userToken}`
        }
      }) 

      const { status} = res.data

      if (status === 'success') { 
        alertUser(true, msg)
      } 
      
    } catch (err) {
      if (err.response) {
        alertUser(false, err.response.data.message)
      } else {
        alertUser(false, err.message)
      }
    }
  }

const sendData: (route: string, data: any, msg: string, token?: string) => Promise<any> = 
  async (route, data, msg, token) => {
    try { 

      let res: AxiosResponse

      if (token) {
        const res = await api.post(route, data, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
  
        const { status, data: resData } = res.data
  
        if (status === 'success') { 
          alertUser(true, msg)
          return res.data
        }  
      } else {
        res = await api.post(route, data)
  
        const { status, data: resData } = res.data
  
        if (status === 'success') { 
          alertUser(true, msg)
          return res
        } 
      }
    } catch (err) {
      if (err.response) {
        console.log(err)
        alertUser(false, err.response.data.message)
      } else {
        alertUser(false, err.message)
      }
    }
  }

const updateOne: (route: string, data: any, msg: string, newRoute?: string) => Promise<void> =
  async (route, data, msg, newRoute) => {
    try {
      const userToken = getUserToken()
      const res = await api.patch(newRoute || route, data, {
        headers: {
          authorization: `Bearer ${userToken}`
        }
      })
  
      const { status, data: { docs, doc } } = res.data

      if (status === 'success') { 
        alertUser(true, msg)
      }  
    } catch (err) {
      if (err.response) {
        alertUser(false, err.response.data.message)
      } else {
        alertUser(false, err.message)
      }
    }
  }

 
export class APICommunicator {
  private route: string

  constructor(route: string) {
    this.route = route
  }

  /**
   * Get All the data from a specific resourse
   */
  public async index(token?: string): Promise<any> {
    const data = await fecthData(this.route, token)
    return data
  }

  /** 
   * Send data to resource
  */
  public async store<T, R>(data: T, msg: string, token?: string, route?: string): Promise<AxiosResponse<R>> {
    const res = await sendData(route || this.route, data, msg, token)
    return res
  }

  public async show<R>(id: string, token?: string): Promise<R> {
    const data = await fecthData(`${this.route}/${id}`, token)
    return data
  }

  public async update<T>(id: string, data: T, msg: string, route?: string) {
    await updateOne(route || `${this.route}/${id}`, data, msg)
  }

  public async destroy(id: string, msg: string) {
    await deleteData(`${this.route}/${id}`, msg)
  }
}