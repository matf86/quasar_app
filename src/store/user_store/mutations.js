export function loginSuccess(state) {
    state.loggedIn = true;
    state.registration_email = '';
    state.registration_message = '';
}

export function loginFailure(state) {
    state.loggedIn = false;
}

export function logout(state) {
    state.loggedIn = false;
    state.user = {};
}

export function registerSuccess(state, payload) {
    state.loggedIn = false;
    state.registration_email = payload.data.email;
    state.registration_message = 'Please login with your credentials';
}

export function registerFailure(state) {
    state.loggedIn = false;
}

export function me(state, payload) {
    state.user = payload;
}