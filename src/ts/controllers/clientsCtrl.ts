import { getAllClientes } from '../models/Clients'

import { mountClientsPage } from '../views/ClientsView'

export const clientsPageCtrl: () => Promise<void> = async () => {
  // 1) Get all clientes
  const clients = await getAllClientes()

  // 2) Mount the clients page
  mountClientsPage(clients)
}