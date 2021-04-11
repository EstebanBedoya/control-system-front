const date: any = new Date()
export const newService = (room: number, price: number, detail: string) => (
    {
        id: `${room}${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}`,
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        hour: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        room: room,
        price: price,
        detail: detail
    }
)