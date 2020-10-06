import { $ } from './elements'

// Add alert to page
export const displayAlert: (type: boolean, msg: string) => void = 
  (type, msg) => {
    const isAlertBox = <HTMLDivElement>$('.alert.visible')
  
    const alertTemp = `
      <div class="alert alert--${type ? 'success' : 'fail'}">
        <p>
          ${msg}
        </p>
      </div>
    `

    const addAlert: () => void = 
      () => {
        document.body.insertAdjacentHTML('afterbegin', alertTemp)

        const alertBox =  <HTMLDivElement>$('.alert')

        setTimeout(() => {
          alertBox.classList.add('visible')
        }, 50)
      }

    if (isAlertBox) {
      isAlertBox.parentElement?.removeChild(isAlertBox)
      addAlert()
    } else {
      addAlert()
    }
  }

// Remove Alert from page
export const removeAlert: (time: number) => void = 
  (time) => {
    const alertBox =  <HTMLDivElement>$('.alert')

    setTimeout(() => {
      alertBox.classList.remove('visible')

      setTimeout(() => {
        alertBox.parentElement?.removeChild(alertBox)
      }, 1000)
    }, time)
  }