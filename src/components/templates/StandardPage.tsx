import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { FC } from "react";

interface props {
  title: String;
}

const StandardPage: FC<props> = ({ children, title }) => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          
          <IonButtons slot="end">
            <IonMenuButton autoHide={true} />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  );
};

export default StandardPage;
