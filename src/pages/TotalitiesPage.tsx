import React, { useEffect, useMemo, useState } from "react";
import StandardPage from "../components/templates/StandardPage";
import {
  IonCol,
  IonGrid,
  IonRow,
  IonLabel,
  IonItem,
  IonText,
  IonList,
  IonListHeader,
  IonButton,
} from "@ionic/react";
// import { calendarOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalitiesAction,
  servicesProvidedByRoomAction,
} from "../redux/statisticsDucks";
import { cookieGet } from "../services/cookies.service";
import moment from "moment";

import FilterDate from "../components/Molecules/FilterDate";

import CurrencyText from "../components/Atoms/CurrencyText";

// const currencyFormat = (number: number) =>
//   Intl.NumberFormat("es-CO", { style: "currency", currency: "COL" }).format(
//     number
//   );

const TotalitiesPage: React.FC = () => {
  const token = cookieGet("token");
  const today = moment().format("DD/MM/yyyy");

  const { totalitiesServices, totalitiesBar } = useSelector(
    (state: any) => state.statistics
  );
  let servicesByRoom = useSelector(
    (state: any) => state.statistics.servicesByRoom
  );

  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);

  const [selectedDate, setSelectedDate] = useState(today);

  // const algo = useMemo(() => {
  //   console.log(selectedDate);
  // }, [selectedDate])

  useEffect(() => {
    dispatch(getTotalitiesAction(token, selectedDate));

    dispatch(servicesProvidedByRoomAction(token, selectedDate));
  }, [selectedDate]);

  const handleClickShowMore = () => {
    setShowMore(showMore ? false : true);
  };

  return (
    <StandardPage title="Balances">
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <FilterDate setSelectedDate={setSelectedDate} />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonLabel>
              <IonText>
                <h2>Total Servicios</h2>
              </IonText>
            </IonLabel>

            <IonLabel>
              <h1>
                <CurrencyText value={totalitiesServices} />
              </h1>
            </IonLabel>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonLabel>
              <IonText>
                <h2>Total Bar</h2>
              </IonText>
            </IonLabel>

            <IonLabel>
              <h1>
                <CurrencyText value={totalitiesBar} />
              </h1>
            </IonLabel>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonLabel>
              <IonText>
                <h2>Total</h2>
              </IonText>
            </IonLabel>

            <IonLabel>
              <h1>
                <CurrencyText value={totalitiesBar + totalitiesServices} />
              </h1>
            </IonLabel>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton
              expand="block"
              color="tertiary"
              fill="clear"
              onClick={handleClickShowMore}
            >
              {!showMore ? "Mostrar más" : "Mostrar Menos"}
            </IonButton>
          </IonCol>
        </IonRow>

        {showMore && (
          <IonRow>
            <IonCol>
              <IonListHeader lines="full">
                <IonLabel>Habitación</IonLabel>

                <IonLabel>Prestados</IonLabel>

                <IonLabel>Valor</IonLabel>
              </IonListHeader>

              <IonList>
                {servicesByRoom.map(
                  ({ _id, cant_services_provided, total }: any) => (
                    <IonItem lines="full" key={_id}>
                      <IonGrid>
                        <IonRow>
                          <IonCol size="5">
                            <IonLabel>
                              <IonText>{_id}</IonText>
                            </IonLabel>
                          </IonCol>

                          <IonCol size="2">
                            <IonLabel>
                              <IonText>{cant_services_provided}</IonText>
                            </IonLabel>
                          </IonCol>

                          <IonCol size="5">
                            <IonLabel>
                              <CurrencyText value={total} />
                            </IonLabel>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonItem>
                  )
                )}
              </IonList>
            </IonCol>
          </IonRow>
        )}
      </IonGrid>
    </StandardPage>
  );
};

export default TotalitiesPage;
