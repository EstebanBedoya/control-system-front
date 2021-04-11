import axios from 'axios'
import api, { statistics } from '../config/api.config'

// const 
const dataInit = {
    totalitiesServices: 0,
    totalitiesBar: 0,
    servicesByRoom: []
}

const GET_TOTALITIES_SUCCESS = 'GET_TOTALITIES_SUCCESS'
const SERVICES_PROVIDED_BY_ROOM = 'SERVICES_PROVIDED_BY_ROOM'

// reducer
export default function statisticsReducer(state = dataInit, action) {
    switch (action.type) {
        case GET_TOTALITIES_SUCCESS:
            return {
                ...state,
                totalitiesServices: action.payload.totalitiesServices,
                totalitiesBar: action.payload.totalitiesBar
            }
        
        case SERVICES_PROVIDED_BY_ROOM:
            return {...state, servicesByRoom: action.payload} 

        default:
            return state
    }
}

// actions

export const getTotalitiesAction = (token, date) => async (dispatch) => {
    try {
        const body = {
            date
        }
        const res = await axios.post(`${api.BASE_URL}${statistics.GET_TOTALITIES}`,
            body,
            { headers: { "x-access-token": token } })
        dispatch({
            type: GET_TOTALITIES_SUCCESS,
            payload: {
                totalitiesServices: res.data.totalServicesValue,
                totalitiesBar: res.data.totalBarValue
            }
        })
    } catch (error) {
        console.log('error pah => ', error)
    }
}
export const servicesProvidedByRoomAction = (token, date) => async (dispatch) => {
    try {
        const url = api.BASE_URL + statistics.SERVICES_PROVIDED_BY_ROOM
        const body = {
            date
        }

        const res = await axios.post(url, body,
            { headers: { "x-access-token": token } })

        dispatch({
            type: SERVICES_PROVIDED_BY_ROOM,
            payload: res.data.result
        })
    } catch (error) {
        console.log('error pah => ', error)
    } 
}
