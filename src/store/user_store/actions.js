import AuthService from '../../services/auth/';
import { api } from 'boot/axios';

export function login ({commit}, data) {
    return AuthService.login(data.email, data.password).then(response => {
        commit('loginSuccess');
        return Promise.resolve(response);
    }).catch(error => {
        commit('loginFailure');
        return Promise.reject(error);
    })
}

export function logout ({commit}) {
    return AuthService.logout().then(response => {
        commit('logout');
        return Promise.resolve(response);
    }).catch(error => {
        return Promise.reject(error);
    })
}

export function register ({commit}, data) {
    return AuthService.register(data.name, data.email, data.password, data.password_confirmation)
    .then(response => {
        commit('registerSuccess', response.data);
        return Promise.resolve(response);
    }).catch(error => {
        return Promise.reject(error);
    })
}

export function me ({commit}, data) {
    return api.get("/api/user").then(response => {
        commit('me', response.data);
        return Promise.resolve(response);
    }).catch(error => {
        return Promise.reject(error);
    });
}