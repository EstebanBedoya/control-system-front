import React, { useEffect, useState } from "react";

import StandardPage from "../components/templates/StandardPage";
import ItemHistoryBar from "../components/Molecules/ItemHistoryBar";
import {
  IonCol,
  IonGrid,
  IonHeader,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonToolbar,
} from "@ionic/react";

import { useSelector, useDispatch } from "react-redux";
import { getBarHistoryAction } from "../redux/historyDukcs";
import { cookieGet } from "../services/cookies.service";
import moment from "moment";
import FilterDate from "../components/Molecules/FilterDate";

import { socket } from "../services/sockets.service";
import debounce from "../services/debounce.service";

const HistoryBarPage: React.FC = () => {
  const today = moment().format("DD/MM/YYYY");
  const token = cookieGet("token");
  const history = useSelector((state: any) => state.history.barHistory);
  // const auth = useSelector((state: any) => state.auth)
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    dispatch(getBarHistoryAction(token, selectedDate));

    socket.on("history products server", () => {
      if (history.length === 0) {
        debounce((t: string, date: any) => dispatch(getBarHistoryAction(t, date)), 1000)(token, selectedDate)
      }
    })
  }, [selectedDate]);

  return (
    <StandardPage title="Historial del bar">
      <IonGrid>
        <IonRow>
          <IonHeader>
            <IonToolbar>
              <FilterDate setSelectedDate={setSelectedDate} />
            </IonToolbar>
          </IonHeader>
        </IonRow>

        <IonRow>
          <IonListHeader lines="full">
            <IonLabel>Producto</IonLabel>

            <IonLabel>Fecha</IonLabel>

            <IonLabel>Total</IonLabel>
          </IonListHeader>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonList>
              {history.map((item: any, i: number) => (
                <ItemHistoryBar key={i} item={item} />
              ))}
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
    </StandardPage>
  );
};

export default HistoryBarPage;
