import { loginCtrl } from '../controllers/authCtrl'
import { errorPageCtrl } from '../controllers/errorPageCtrl'
import { homePageCtrl } from '../controllers/homePageCtrl'

export default {
  login: loginCtrl,
  error: errorPageCtrl,
  home: homePageCtrl
}