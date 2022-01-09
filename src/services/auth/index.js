import { api } from 'boot/axios'
import { LocalStorage } from 'quasar'

class AuthService {
    login(email, password) {
      return api.get('/sanctum/csrf-cookie').then(response => {
        if(response.status === 204) {
            return api.post('/login', {
                email: email,
                password: password
            }).then(response => {
                if(response.status === 204) {
                    try {
                        LocalStorage.set('isAuth', true)
                        return response
                    } catch (e) {
                        console.log(e)
                        throw 'AuthService - local storage error';
                    }
                } else {
                    throw 'AuthService - login error';
                }
            })
        } else {
            throw 'AuthService - session cookie retrive error';
        }
      }).catch(error => {
        throw error  
      })
    }

    register(name, email, password, password_confirmation) {
        return api.get('/sanctum/csrf-cookie').then(response => {
          if(response.status === 204) {
              return api.post('/register', {
                  name: name, 
                  email: email,
                  password: password,
                  password_confirmation: password_confirmation
              }).then(response => {
                  if(response.status === 201) {
                    return response
                  } else {
                    throw 'AuthService - registration error';
                  }
              })
          } else {
              throw 'AuthService - session cookie retrive error';
          }
        }).catch(error => {
          throw error
        })
    }

    logout() {
        return api.post('/logout').then(response => {
            if(response.status === 204) {
                try {
                    LocalStorage.remove('isAuth')
                    return response
                } catch (e) {
                    console.log(e)
                    throw 'AuthService - local storage error';
                }
            } else {
                throw 'AuthService - logout error';
            }
        })
    }
}
  
export default new AuthService();
