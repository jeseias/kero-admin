import { getAllMessages } from '../models/Messages'

import { mountMessagePage } from '../views/MessageView'

export const messagesPageCtrl: () => Promise<void> = async () => {
  // 1) Get all clientes
  const messages = await getAllMessages()

  // 2) Mount the clients page
  mountMessagePage(messages)
}