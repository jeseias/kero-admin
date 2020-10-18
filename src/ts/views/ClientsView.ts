
import DOM from './elements'
import { addChildren } from './View'

import { IUser } from '../constants/interfaces'

const {
  header: { totalClients },
  allClientesContainer
} = DOM.pages.clients

const headerSetup: (total: number) => void = (total) => totalClients.textContent = `${total} Clientes cadastrados na plataforma`


const showAllUser: (clients: IUser[]) => Promise<void> = async (clients) => {
  const temp: (data: IUser) => string = data => {
    return `
      <div class="user-card">
        <img class="user-card__img" src="${data.img__url}"/>
        <h2 class="user-card__name">${data.name}</h2>
        <p class="user-card__email">${data.email}</p>
        <p class="user-card__phone">${data.phone ? data.phone : '--- --- ---'}</p>
      </div>
    `
  }

  addChildren(allClientesContainer, clients, temp, 'afterbegin')
}

export const mountClientsPage: (clients: IUser[]) => Promise<void> = async (clients) => {
  headerSetup(clients.length)

  await showAllUser(clients)
}