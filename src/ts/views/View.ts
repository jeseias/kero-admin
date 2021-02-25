import { alertUser } from '../models/Alert'

export const svgLocation = 'src/assets/SVGs/sprite.svg#icon-'

export const menuToggler: (btn: HTMLElement, menu: HTMLElement, type: 'user' | 'checkout') => void = (btn, menu, type) => {
  btn.addEventListener('click', () => {
    menu.style.display = 'block'

    setTimeout(() => {
      menu.classList.toggle('visible') 

      if (!menu.classList.contains('visible')) {
        menu.classList.remove('visible')

        setTimeout(() => {
          menu.style.display = 'none'
        }, 350)
      } else {
        setTimeout(() => { 

          document.body.addEventListener('click', (e: Event) => {
            const el = <HTMLElement>e.target

            if (!el.classList.contains(`${type}__menu__item`) || !el.classList.contains(`${type}__item`)) {
              if (el.classList.contains(`${type}__icon`)) return
              menu.classList.remove('visible')
            } 
          })
        }, 100)
      }
    }, 100)
  })

  menu.addEventListener('mouseleave', () => {
    menu.classList.remove('visible')
  })
}

export const removeChildren: (parent: HTMLElement) => void = 
  (parent) => {
    const children = Array.from(parent.children);
    children.forEach(child => {
      parent.removeChild(child)
    })
  } 
  
export const addChild: <T>(
  parent: HTMLDivElement, 
  data: T, 
  tempGenerator: (data: T) => string,
  where?: InsertPosition
) => void =
  (parent, data, tempGenerator, where) => {
    if (parent.children) {
      removeChildren(parent)
    }

    parent.insertAdjacentHTML(where || 'afterbegin', tempGenerator(data))
  }

export const userInputNotification: (args: [HTMLInputElement | HTMLSelectElement, string][]) => boolean = (input) => {
  return input.every(element => {
    if (!element[0].value)  {
      alertUser(false, element[1])
      return false
    } else {
      return true
    }
  })
}

export function removeAllText(element: HTMLDivElement | ChildNode) {

  // loop through all the nodes of the element
  var nodes = element.childNodes;

  for(var i = 0; i < nodes.length; i++) {

      var node = nodes[i];

      // if it's a text node, remove it
      if(node.nodeType == Node.TEXT_NODE) {

          node.parentNode!.removeChild(node);


          i--; // have to update our incrementor since we just removed a node from childNodes

      } else

      // if it's an element, repeat this process
      if(node.nodeType == Node.ELEMENT_NODE) {

          removeAllText(node);

      }
  }
}

export const addChildren: (
    parent: HTMLElement, 
    data: any, 
    tempGenerator: (data: any) => string,
    where?: InsertPosition
) => void =
  (parent, data, tempGenerator, where) => {
    if (parent.children) {
      removeChildren(parent)
    }

    data.forEach((item: any) => parent.insertAdjacentHTML(where || 'beforeend', tempGenerator(item)))
  }

export const setThisActive: (
  el: HTMLDivElement, 
  list: HTMLDivElement[],
  classStr: string
) => void =
  (el, list, classStr) => {
    const activeEl = list.filter(el => el.classList.contains(classStr))[0]

    if (activeEl) activeEl.classList.remove(classStr)
    el.classList.add(classStr);
  }

export const textShorter: (no: number, text: string) => string = 
  (no, text) => {
    let finalText = text
    
    if(finalText.length > no) {
      finalText = `${finalText.slice(0, no)} ...` 
    }

    return finalText
  }

/**
 * Cleans up all form fields
 * @param inputs All the inputs that the property value to be clean up
 * @param files All inputs that take in files to be nullified
 * @param imgBox If the is an image box to clean
 */
export const formFieldsCleaner: (
  inputs: (HTMLInputElement | HTMLTextAreaElement)[], 
  files: HTMLInputElement[] | null, 
  imgBox?: HTMLDivElement
) => void =
  (inputs, files, imgBox) => {
    inputs.forEach(input => input.value = '')
    if (files) files.forEach(input => input.files = null) 

    if (imgBox) {
      imgBox.removeChild(imgBox.firstElementChild!)
      imgBox.classList.remove('hasimg')
      imgBox.classList.add('empty')
    }
  }