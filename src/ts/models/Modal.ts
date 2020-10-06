import { displayModal, closeModel } from '../views/ViewModal'

export const showModal: (
  temp: string
) => void = (temp) => displayModal(temp)

export const hideModal: () => void = 
  () => closeModel(<HTMLDivElement>document.body.querySelector('.modal'))