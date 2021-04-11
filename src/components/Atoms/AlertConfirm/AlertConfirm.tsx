import React, { useState } from "react";
import { IonAlert } from "@ionic/react";

interface props {
    show: boolean
    setShow: any
    handleConfirm: any
    text: string
}

const AlertConfirm: React.FC<props> = ({show, setShow, handleConfirm, text}) => {
  
  return (
    <>
      <IonAlert
        isOpen={show}
        onDidDismiss={() => setShow(false)}
        header={"Confirmar"}
        message={text}
        buttons={[
          {
            text: "Canclear",
            role: "cancel",
            handler: () => setShow(false),
          },
          {
            text: "Confirmar",
            role: "confirm",
            handler: handleConfirm,
          },
        ]}
      />
    </>
  );
};

export default AlertConfirm;
