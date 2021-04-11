import React, { useState } from "react";

import {
  IonButton,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonAlert,
} from "@ionic/react";
import Modal from "../../Atoms/Modal";
import CurrencyText from "../../Atoms/CurrencyText";
import { useDispatch } from "react-redux";
import { deleteHistoryBarAction } from "../../../redux/historyDukcs";
import { cookieGet } from "../../../services/cookies.service";
import { socket } from "../../../services/sockets.service";
import AlertConfirm from "../../Atoms/AlertConfirm";

interface props {
  item: any;
}

const token = cookieGet("token");

const ItemHistoryBar: React.FC<props> = ({ item }) => {
  const { product, room, quantity, unitValue, totalValue, date } = item;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    setShowAlert(true);
  };

  const handleConfirm = () => {
    dispatch(deleteHistoryBarAction(token, item._id));
    socket.emit("history products client");
    socket.emit("products client");
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

      <Modal title="Detalles" isOpen={showModal} handleCahnge={closeModal}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Producto:</IonLabel>
                <IonLabel>{product}</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Habitación:</IonLabel>
                <IonLabel>{room === "none" ? "ninguna" : room}</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Fecha:</IonLabel>
                <IonLabel>{date}</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Cantidad vendida:</IonLabel>
                <IonLabel>{quantity}</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Valor unitario:</IonLabel>
                <IonLabel>
                  <CurrencyText value={unitValue} />
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Valor total:</IonLabel>
                <IonLabel>
                  <CurrencyText value={totalValue} />
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="6">
              <IonButton color="danger" expand="full" onClick={closeModal}>
                Cancelar
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton color="primary" expand="full" onClick={handleClick}>
                Hacer devolución
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </Modal>

      <IonItem onClick={() => setShowModal(true)}>
        <IonGrid>
          <IonRow>
            <IonCol size="3">
              <IonLabel>{product}</IonLabel>
            </IonCol>
            <IonCol size="4">
              <IonLabel>{date}</IonLabel>
            </IonCol>
            <IonCol size="5">
              <CurrencyText value={totalValue} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </>
  );
};

export default ItemHistoryBar;
function textButton(state: any, selectedState: any): React.ReactNode {
  throw new Error("Function not implemented.");
}
