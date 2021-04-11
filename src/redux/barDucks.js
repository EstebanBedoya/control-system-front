// imports
import axios from 'axios'
import api, { barPoints } from '../config/api.config'

// consts

const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
const UPDATE_STOCK_SUCCES = 'UPDATE_STOCK_SUCCES'
const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS'

// reduce

export default function barReducer(state = [], action) {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return action.payload

        case UPDATE_STOCK_SUCCES:
            return action.payload

        case CREATE_PRODUCT_SUCCESS:
            return [...state, action.payload]

        default:
            return state
    }
}

// actions
export const getProdcutsAction = (token) => async (dispatch) => {
    // , { headers: { "x-access-token": token } }
    try {
        const res = await axios.get(`${api.BASE_URL}${barPoints.GET_ALL}`, { headers: { "x-access-token": token } })
        dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: res.data.result
        })
    } catch (error) {
        console.log('error => ' + error)
    }
}

export const createProductAction = (token, newProduct) => async (dispatch) => {
    try {
        const res = await axios.post(api.BASE_URL + barPoints.CREATE_PROTUCT, newProduct, { headers: { "x-access-token": token } })
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: res.data.result
        })
    } catch (error) {
        console.log('error => ' + error)
    }
}

export const updateProductStockAction = (token, id, stock) => async (dispatch) => {
    try {
        const res = await axios.put(api.BASE_URL + barPoints.UPDATE_STOCK(id, stock), {}, { headers: { "x-access-token": token } })
        dispatch({
            type: UPDATE_STOCK_SUCCES,
            payload: res.data.result
        })
    } catch (error) {
        console.log('error => ' + error)
    }
}


