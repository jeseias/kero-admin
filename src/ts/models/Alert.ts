import { displayAlert, removeAlert } from '../views/AlertView'

// Alerts the user
export const alertUser: (type: boolean, msg: string, time?: number) => void = 
  (type, msg, time) => {
    displayAlert(type, msg)
    removeAlert(time || 3000)
  }