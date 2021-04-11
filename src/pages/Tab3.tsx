import React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Tab3: React.FC = () => {

  const handleClick = () => {
    console.log('sapaperra')
    
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1>holis mundis</h1>
        <IonButton onClick={handleClick}>Oprimeme :v</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
