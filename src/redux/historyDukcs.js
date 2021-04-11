// imports
import axios from 'axios'
import api, { historyPoints } from '../config/api.config'

// consts
const dataInit = {
    services: [],
    barHistory: []
}

const GET_ALL_SERVICES_SUCCESS = 'GET_ALL_SERVICES_SUCCESS'
const GET_ALL_BAR_HISTORY_SUCCESS = 'GET_ALL_BAR_HISTORY_SUCCESS'
const CREATE_SERVICE_SUCCESS = 'CREATE_SERVICE_SUCCESS'
const CREATE_BAR_HISTORY_SUCCESS = 'CREATE_BAR_HISTORY_SUCCESS'
const DELETE_HISTORY_SERVICE_SUCCESS = 'DELETE_HISTORY_SERVICE_SUCCESS'
const DELETE_HISTORY_BAR_SUCCESS = 'DELETE_HISTORY_BAR_SUCCESS'

// reducer
export default function hisotryReducer(state = dataInit, action) {
    switch (action.type) {
        case GET_ALL_SERVICES_SUCCESS:
            return { ...state, services: action.payload }

        case CREATE_SERVICE_SUCCESS:
            return { ...state, services: [action.payload, ...state.services] }

        case GET_ALL_BAR_HISTORY_SUCCESS:
            return { ...state, barHistory: action.payload }

        case CREATE_BAR_HISTORY_SUCCESS:
            return { ...state, barHistory: [...action.payload, ...state.barHistory] }

        case DELETE_HISTORY_SERVICE_SUCCESS:
            return [...state, action.payload]

        case DELETE_HISTORY_BAR_SUCCESS:
            return [...state, action.payload]

        default:
            return state
    }
}

// actions
export const getServicesAction = (token, date) => async (dispatch) => {

    try {
        const body = {
            date
        }
        const res = await axios.post(`${api.BASE_URL}${historyPoints.GET_HISTORY_SERVICES}`,
            body,
            { headers: { "x-access-token": token } })
        dispatch({
            type: GET_ALL_SERVICES_SUCCESS,
            payload: res.data.result
        })
    } catch (error) {
        console.log('error => ', error)
    }
}

export const getBarHistoryAction = (token, date) => async (dispatch) => {
    try {
        const body = {
            date
        }
        const res = await axios.post(api.BASE_URL + historyPoints.GET_HISTORY_BAR,
            body,
            { headers: { "x-access-token": token } })
        dispatch({
            type: GET_ALL_BAR_HISTORY_SUCCESS,
            payload: res.data.result
        })
    } catch (error) {
        console.log('error => ', error)
    }
}

export const createServiceAction = (token, newService) => async (dispatch) => {
    try {
        // http://localhost:3001/api/history/services/create
        // ${api.BASE_URL}${historyPoints.CREATE_SERVICE}
        const res = await axios.post(`${api.BASE_URL}${historyPoints.CREATE_SERVICE}`, newService,
            { headers: { "x-access-token": token } })
        dispatch({
            type: CREATE_SERVICE_SUCCESS,
            payload: res.data.result
        })
    } catch (error) {
        console.log('error => ', error)
    }
}

export const createBarHistory = (token, newItem) => async (dispatch) => {

    try {
        const res = await axios.post(api.BASE_URL + historyPoints.CREATE_BAR_HISTORY,
            newItem,
            { headers: { "x-access-token": token } })

        dispatch({
            type: CREATE_BAR_HISTORY_SUCCESS,
            payload: [res.data.result]
        })
    } catch (error) {
        console.log('error => ', error)
    }
}

export const deleteServiceAction = (token, id) => async (dispatch) => {
    try {
        const res = await axios.delete(api.BASE_URL + historyPoints.DELETE_SERVICE(id),
            {},
            { headers: { "x-access-token": token } })

        dispatch({
            type: DELETE_HISTORY_SERVICE_SUCCESS,
            payload: res.data.result
        })
    } catch (error) {
        console.log('error => ', error)
    }
}

export const deleteHistoryBarAction = (token, id) => async (dispatch) => {
    try {
        const res = await axios.delete(api.BASE_URL + historyPoints.DELETE_HISTORY_BAR(id),
            {},
            { headers: { "x-access-token": token } })

        dispatch({
            type: DELETE_HISTORY_BAR_SUCCESS,
            payload: res.data.result
        })
    } catch (error) {
        console.log('error => ', error)
    }
}   


