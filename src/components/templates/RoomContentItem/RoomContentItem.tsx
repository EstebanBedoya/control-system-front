import React, { FC, useEffect } from "react";
import { IonLabel } from "@ionic/react";
import Badge from "../../Atoms/Badge";
import { rangePrices } from "../../../services/rooms.service";
import states from "../../../utils/states";
import { handleColor } from "../../../services/rooms.service";
import moment from 'moment'

interface Props {
  item: any;
}

const { disponible, ocupado, alistamiento, mantenimiento, reservado } = states;

const RoomContentItem: FC<Props> = ({ item }) => {
  const today = moment().format('DD/MMM/YYYY')
  const textTraslate = () => {
    if (item.temporary.typeService === "littleWhile") return "Rato";

    if (item.temporary.typeService === "dawn") return "Amanecida";
  };

  const text = () => {
    if (item.state === disponible) {
      return (
        <>
          <h2>Precio rato </h2>
          <p>{rangePrices(item).littleWhile}$</p>
        </>
      );
    } else {
      return (
        <>
          {/* <h2>{item.state === ocupado? 'Servicio': 'Estado'}</h2> */}
          <p>{item.state === ocupado ? textTraslate(): today}</p>
          <p>{item.temporary.checkinTime}</p>
        </>
      );
    }
  };

  return (
    <>
      <IonLabel>
        <h2>{item.thematic}</h2>
        <h1>{item.id}</h1>
      </IonLabel>

      <IonLabel>{text()}</IonLabel>

      <IonLabel>
        <h2>
          <Badge text={item.state} color={handleColor(item.state)} />
        </h2>
      </IonLabel>
    </>
  );
};

export default RoomContentItem;
