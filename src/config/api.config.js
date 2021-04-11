// https://el-cielo-api.herokuapp.com
// http://localhost:3001

//ionic build
// npx cap add android || npx cap update andorid
// npx cap open andorid

export default {
    BASE_URL: 'http://localhost:3001',

    LOGIN: '/api/auth/login',
    WebSocket: '/socket.io/socket.io.js'
}

export const roomPoints = {
    GET_ALL_ROOMS: '/api/rooms/get-all',
    UPDATE_AVAILABLE_ROOM: '/api/rooms/update-state', //recibe un id,
}

export const historyPoints = {
    GET_HISTORY_SERVICES: '/api/history/services/get-all',
    GET_HISTORY_BAR: '/api/history/bar/get-all',
    CREATE_SERVICE: '/api/history/services/create',
    CREATE_BAR_HISTORY: '/api/history/bar/create',
    DELETE_SERVICE: (id) => `/api/history/services/${id}`,
    DELETE_HISTORY_BAR: (id) => `/api/history/bar/${id}`
}

export const barPoints = {
    GET_ALL: '/api/bar/products/get-all',
    CREATE_PROTUCT: '/api/bar/products/create-product',
    UPDATE_STOCK: (id, stock) => `/api/bar/products/update-stock/?_id=${id}&stock=${stock}`
}

export const statistics = {
    GET_TOTALITIES: '/api/statistics/get-totalities',
    SERVICES_PROVIDED_BY_ROOM: '/api/statistics/services_provided_by_room'
}