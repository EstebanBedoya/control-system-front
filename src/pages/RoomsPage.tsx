import React, { useEffect, useState } from "react";
//imports redux
import { useSelector, useDispatch } from "react-redux";
import { getAllRoomsActions } from "../redux/roomDucks";
import { getBarHistoryAction, getServicesAction } from "../redux/historyDukcs";

//import ionic components

// import custom components
import ItemList from "../components/Organisms/ItemList";
import Segments from "../components/Organisms/Segments";

// import services
import { filterRooms } from "../services/rooms.service";
import StandardPage from "../components/templates/StandardPage";

import { cookieGet } from "../services/cookies.service";

import { socket } from "../services/sockets.service";

import debounce from '../services/debounce.service'

const segments = [
  {
    text: "todas",
    value: "todas",
  },
  {
    text: "sencillas",
    value: "sencilla",
  },
  {
    text: "jacuzzis",
    value: "jacuzzi",
  },
  {
    text: "suits",
    value: "suit",
  },
  {
    text: "sauna",
    value: "sauna",
  },
];

const Tab1: React.FC = () => {
  const rooms = useSelector((state: any) => state.rooms);
  const [segment, setSegment] = useState<String>("todas");

  const dispatch = useDispatch();

  const token = cookieGet("token")

  useEffect(() => {
    if (rooms.length === 0) {
      socket.emit('rooms client')
      dispatch(getBarHistoryAction(token))
      dispatch(getServicesAction(token))
    }

    socket.on("rooms server", () => {
      if (rooms.length === 0){
        debounce((t: string) => dispatch(getAllRoomsActions(t)), 1000)(token)
      }
    });
  });

  const changeSegment = (e: any) => {
    setSegment(e.detail.value);
  };

  return (
    <StandardPage title="Habitaciones">
      <Segments handleChange={changeSegment} segments={segments} />
      <ItemList array={filterRooms(segment, rooms)} type="room" />
    </StandardPage>
  );
};

export default Tab1;
