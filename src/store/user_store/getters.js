import { LocalStorage } from 'quasar'

export function isLoggedIn (state) {
    if(LocalStorage.getItem('isAuth') === true && state.loggedIn === true) {
        return true;
    }
    return false;
}
