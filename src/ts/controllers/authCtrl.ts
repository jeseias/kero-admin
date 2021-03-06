import { loginAdmin } from '../models/Auth'

import DOM from '../views/elements'
import { userInputNotification } from '../views/View'

export const loginCtrl: () => void = () => {
  const { form: { self: form, email, password } } = DOM.loginPage
  
  form.addEventListener('submit', async (e: Event) => {
    (function(w) {
      w = w || window; 
      var i = w.setInterval(function(){},100000); 
      while(i>=0) { w.clearInterval(i--); }
    })(window);

    e.preventDefault()

    const isValidated = userInputNotification([
      [email, 'O seu email'],
      [password, 'A sua senha']
    ])

    if (isValidated) {
      await loginAdmin(email.value, password.value);
    }
  })
}