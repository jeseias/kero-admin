import { getAllMessages, deleteMessage } from '../models/Messages'

import { mountMessagePage } from '../views/MessageView'

import { afterDOM } from '../views/elements'

const messageListenerCtrl: () => Promise<void> = async () => {
  const { deleteMsgBtn } = afterDOM.pages.messages
  
  const deleteMessageListener: () => void = () => {
    const deleteBtns = deleteMsgBtn()

    deleteBtns.forEach(btn => btn.addEventListener('click', async () => {
      const id = btn.parentElement!.id 

      await deleteMessage(id)
    }))
  }


  // Call my listerners here
  deleteMessageListener()
}

export const messagesPageCtrl: () => Promise<void> = async () => {
  // 1) Get all clientes
  const messages = await getAllMessages()

  // 2) Mount the clients page
  mountMessagePage(messages)

  // 3) Page event listerner
  await messageListenerCtrl()
}