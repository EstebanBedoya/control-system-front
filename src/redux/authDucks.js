// imports
import axios from 'axios'
import config from '../config/api.config'
import { cookieSave } from '../services/cookies.service'

// consts
const init = {
    token: '',
    roles: [],
    timeout: 0
}

const LOGIN_SUCCESS = 'LOGIN_SUCCES'
const LOGIN_ERROR = 'LOGIN_ERROR'

// reducer
export default function authReducer(state = init, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:

            return { ...state, token: action.payload.token, roles: action.payload.roles }

        case LOGIN_ERROR:

            return { ...state, token: action.payload.res }

        default:
            return state
    }
}

// actions

export const loginAction = (username, password) => async (dispatch) => {
    try {
        const body = {
            username,
            password
        }

        const res = await axios.post(`${config.BASE_URL}${config.LOGIN}`, body)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: res.data.token,
                roles: res.data.roles,
                timeout: res.config.timeout
            }
        })

        cookieSave("token", res.data.token);
        cookieSave('role', res.data.roles)

    } catch (error) {
        console.log(error)
        dispatch({
            type: LOGIN_ERROR,
            payload: {
                res: 'nope'
            }
        })
    }
}

