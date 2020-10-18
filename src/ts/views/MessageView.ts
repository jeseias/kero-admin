import DOM from './elements'
import { addChildren } from './View'

import { IMessage } from '../constants/interfaces'

const {
  header: { totalMessages },
  allMessagesContainer
} = DOM.pages.messages

const headerSetup: () => void = () => {

}

const showAllMessages: (messages: IMessage[]) => Promise<void> = async (messages) => {
  const temp: (data: IMessage) => string = data => {
    
    return `
      <div class="message-card"> 
        <h2 class="message-card__name">${data.name}</h2>
        <span class="message-card__badge">${data.number}</span>
        <p class="message-card__text">${data.message}</p>
      </div>
    `
  }

  addChildren(allMessagesContainer, messages, temp, 'afterbegin')
}

export const mountMessagePage: (messages: IMessage[]) => Promise<void> = async (messages) => {
  headerSetup()

  await showAllMessages(messages)
}