export const closeModel: (modal: HTMLDivElement) => void =
  (modal) => {
    modal.classList.remove('visible')
    setTimeout(() => {
      document.body.removeChild(modal)
    }, 1000)
  }

const hideModal: () => void =
  () => {
    document.body.addEventListener('click', (e: Event) => {
      const el = <HTMLDivElement>e.target
      if (el && el.classList.contains('modal')) {
        closeModel(el)
      } else if (el && el.closest('.close')) {
        closeModel(<HTMLDivElement>el.closest('.modal'))
      }
    }) 
  }

export const displayModal: (
  temp: string
) => void =
  (temp) => {
    const modalTemp =  `
      <div class="modal">
        ${temp}
      </div>
    `

    const isTheAModal = document.querySelector('.modal')

    document.body.insertAdjacentHTML('afterbegin', modalTemp)
    setTimeout(() => {
      if (isTheAModal) {
        isTheAModal.parentElement!.removeChild(isTheAModal)
      }
      document.body.querySelector('.modal')!.classList.add('visible')
    }, 250)

    hideModal()
  }