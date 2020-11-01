import { alertUser } from './Alert'
import { getUserToken } from '../models/Auth'
import { APICommunicator } from '../Utils/API'

import { GEBI } from '../views/elements'

import { IMessage } from '../constants/interfaces'

export const MessageAPI = new APICommunicator('/contacts')

export const getAllMessages: () => Promise<IMessage[]> = async () => await MessageAPI.index(getUserToken())

export const deleteMessage: (id: string) => Promise<void> = async id => {
  try {
    await MessageAPI.destroy(id, 'Messagen eliminado com successo')
    alertUser(true, 'Messagen eliminado com successo')

    const messageDiv = <HTMLDivElement>GEBI(`${id}`) 
    messageDiv.parentElement!.removeChild(messageDiv)
  } catch (error) {
    alertUser(false, 'Não foi possivel eliminar a mensagen')
  }
}
