import states from "../utils/states";

const date = new Date();
const { disponible, ocupado, alistamiento, mantenimiento, reservado } = states;

export const rangePrices = (item: any) =>
  date.getDay() === 6 || date.getDay() === 5
    ? item.prices.weekend
    : item.prices.week;

export const updateAvailable = (items: any, id: String) => {
  return items.map((item: any) => {
    if (item.id === id) {
      item.available = !item.available ? true : false;
      return item;
    }
    return item;
  });
};

export const filterRooms = (category: String, rooms: any) => {
  if(category === 'todas') return rooms
  return rooms.filter((room: any) => room.category === category);
}

export const handleColor = (state: string) => {
  switch (state) {
    case disponible:
      return "success";
    case ocupado:
      return "danger";
    case reservado:
      return "warning";
    case alistamiento:
      return "secondary";
    case mantenimiento:
      return "medium";
  }
};
  
