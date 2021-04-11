import React, { useEffect, useState } from "react";
import ItemList from "../components/Organisms/ItemList";
import FilterDate from "../components/Molecules/FilterDate";
import { useSelector, useDispatch } from "react-redux";
import { getServicesAction } from "../redux/historyDukcs";
import StandardPage from "../components/templates/StandardPage";
import { cookieGet } from "../services/cookies.service";
import moment from "moment";
import {
  IonCol,
  IonGrid,
  IonHeader,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import { socket } from "../services/sockets.service";
import debounce from "../services/debounce.service";

const ServicesPage: React.FC = () => {
  const today = moment().format("DD/MM/YYYY");
  const token = cookieGet("token")
  const services = useSelector((state: any) => state.history.services);
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    dispatch(getServicesAction(token, selectedDate));
    
    socket.on("history services server", () => {
      if (services.length === 0) {
        debounce((t: string, date: any) => dispatch(getServicesAction(t, date)), 1000)(token, selectedDate)
      }
    })

  }, [selectedDate]);

  return (
    <StandardPage title="Historial de servicios">
      <IonGrid>
        <IonRow>
          <IonHeader>
            <IonToolbar>
              <FilterDate setSelectedDate={setSelectedDate} />
            </IonToolbar>
          </IonHeader>
        </IonRow>

        <IonRow>
          <IonCol>
            <ItemList array={services} type="service" />
          </IonCol>
        </IonRow>
      </IonGrid>
    </StandardPage>
  );
};

export default ServicesPage;
