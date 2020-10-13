import { getUserToken } from '../models/Auth'
import { APICommunicator } from '../Utils/API'

import { IUser } from '../constants/interfaces'

export const UserAPI = new APICommunicator('/users?role=user')

export const getAllClientes: () => Promise<IUser[]> = async () => await UserAPI.index(getUserToken())
