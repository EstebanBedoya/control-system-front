import { IonToast } from "@ionic/react";
import React from "react";

interface props {
  show: any;
  set: any;
  message: string
  duration: number
}

const Toast: React.FC<props> = ({ show, set, message, duration }) => {
  return (
    <>
      <IonToast
        isOpen={show}
        onDidDismiss={() => set(false)}
        message={message}
        duration={duration}
      />
    </>
  );
};

export default Toast;
