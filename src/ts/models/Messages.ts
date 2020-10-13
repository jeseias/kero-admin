import { getUserToken } from '../models/Auth'
import { APICommunicator } from '../Utils/API'

import { IMessage } from '../constants/interfaces'

export const MessageAPI = new APICommunicator('/contacts')

export const getAllMessages: () => Promise<IMessage[]> = async () => await MessageAPI.index(getUserToken())
