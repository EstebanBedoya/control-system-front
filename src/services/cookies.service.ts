import Cookies from "universal-cookie";

const cookies = new Cookies()

export const cookieSave = (key: string, value: string) => cookies.set(key, value) 
export const cookieGet = (key: string) => cookies.get(key)
export const cookieRemove = (key: string) => cookies.remove(key)