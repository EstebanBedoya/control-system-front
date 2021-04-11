import React, { FC, useState } from "react";
import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";
import { deleteServiceAction } from "../../../redux/historyDukcs";
import { cookieGet } from "../../../services/cookies.service";

import { socket } from "../../../services/sockets.service";
import { useDispatch } from "react-redux";
import AlertConfirm from "../../Atoms/AlertConfirm";

interface Props {
  item: any;
  closeModal: any;
}

const ServiceContentModal: FC<Props> = ({ item, closeModal }) => {
  const token = cookieGet("token");
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false)

  const handleConfirm = () => {
    dispatch(deleteServiceAction(token, item._id));
    socket.emit("rooms client");
    socket.emit("history services client");
    closeModal();
  };

  return (
    <>
      <AlertConfirm
        text="¿Esta seguro de hacer la devolución?"
        show={showAlert}
        setShow={setShowAlert}
        handleConfirm={handleConfirm}
      />

      <IonGrid>
        <IonRow>
          <IonCol>
            <h6>Habitación: {item.room}</h6>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <h6>Precio: {item.price}$</h6>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <h6>Fecha</h6>
            <p>{item.date}</p>
          </IonCol>
          <IonCol>
            <h6>Hora</h6>
            <p>{item.hour}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <h6>Detalle</h6>
            <p>{item.detail ? item.detail : "sin detalles"}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton color="danger" expand="full" onClick={closeModal}>
              Cerrar
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton color="secondary" expand="full" onClick={() => setShowAlert(true)}>
              Hacer devolución
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default ServiceContentModal;
