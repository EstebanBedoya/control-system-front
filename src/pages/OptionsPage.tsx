import React from "react";

import { IonButton, IonGrid, IonRow, IonCol } from "@ionic/react";

import StandardPage from "../components/templates/StandardPage";

import { useHistory } from "react-router-dom";

const OptionsPage: React.FC = () => {
  const history = useHistory();

  // const handleClick = async () => {
  //   await menuController.close();
  // };

  return (
    <StandardPage title="Opciones">
      <IonGrid>
        <IonRow style={{ marginTop: "20px" }}>
          <IonCol>
            <IonButton
              onClick={() => history.push("/options/services-history")}
              style={{ marginTop: "10px" }}
              expand="block"
            >
              Historial de servicios
            </IonButton>
            <IonButton
              onClick={() => history.push("/options/bar-history")}
              style={{ marginTop: "10px" }}
              expand="block"
            >
              Historial del bar
            </IonButton>
            <IonButton
              onClick={() => history.push("/products/create")}
              style={{ marginTop: "10px" }}
              expand="block"
            >
              Agregar productos
            </IonButton>
            <IonButton
              onClick={() => history.push('/options/totalities')}
              style={{ marginTop: "10px" }}
              expand="block"
            >
              Balances totales
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </StandardPage>
  );
};

export default OptionsPage;
