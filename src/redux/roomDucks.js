// imports
// import { Rooms } from '../models/mock-data.json'
// import { updateAvailable } from '../services/rooms'
import axios from 'axios'
import api, { roomPoints } from '../config/api.config'

// consts

const dataInit = []

const GET_ROOMS_SUCCESS = 'GET_ROOMS_SUCCESS'
const UPDATE_AVAILABLE_SUCCESS = 'UPDATE_AVAILABLE_SUCCESS'

// reducer
export default function roomReducer(state = dataInit, action) {
    switch (action.type) {
        case GET_ROOMS_SUCCESS:
            return action.payload

        case UPDATE_AVAILABLE_SUCCESS:
            return action.payload

        default:
            return state
    }
}

// actions

export const getAllRoomsActions = (tok) => async (dispatch) => {
    try {
        const res = await axios.get(`${api.BASE_URL}${roomPoints.GET_ALL_ROOMS}`,
            { headers: { "x-access-token": tok } })

        dispatch({
            type: GET_ROOMS_SUCCESS,
            payload: res.data.result
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateStateAction = (body, token) => async (dsipatch) => {
    try {
        const res = await axios.put(`${api.BASE_URL}${roomPoints.UPDATE_AVAILABLE_ROOM}`,
            body,
            { headers: { "x-access-token": token } })

        dsipatch({
            type: UPDATE_AVAILABLE_SUCCESS,
            payload: res.data.result
        })

    } catch (error) {
        console.log(error)
    }
}