import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createServiceAction } from "../../../redux/historyDukcs";
import { updateStateAction } from "../../../redux/roomDucks";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonLabel,
  IonItem,
} from "@ionic/react";
import Badge from "../../Atoms/Badge";
import { rangePrices } from "../../../services/rooms.service";

import { cookieGet } from "../../../services/cookies.service";

import { socket } from "../../../services/sockets.service";
import moment from "moment";

import states from "../../../utils/states";

import { handleColor } from "../../../services/rooms.service";
import AlertConfirm from "../../Atoms/AlertConfirm";

interface Props {
  item: any;
  closeModal: any;
  openToast: any;
  changeTypeService?: any;
  typeService?: any;
}

const statesOptions = [
  { text: "Dar servicio", value: states.ocupado },
  { text: "Reservar", value: states.reservado },
  { text: "Mantenimiento", value: states.mantenimiento },
];

const { disponible, ocupado, alistamiento, mantenimiento, reservado } = states;

const textButton = (actualState: any, nextState: string) => {
  if (nextState === ocupado && actualState === disponible)
    return "Dar servicio";
  else return "Cambiar";
};

const RoomContentModal: FC<Props> = ({
  item,
  closeModal,
  openToast,
  changeTypeService,
}) => {
  const dispatch = useDispatch();
  const token = cookieGet("token");
  const [valuePrice, setValuePrice] = useState<number>(
    rangePrices(item).littleWhile
  );
  const [textArea, setTextArea] = useState<string>("");
  const [hour, setHour] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("littleWhile");
  const [selectedState, setSelectedState] = useState("ocupado");
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    let i = setInterval(() => setHour(moment().format("H:mm:ss")), 500);

    if (selectedPrice === "littleWhile") {
      setValuePrice(rangePrices(item).littleWhile);
    }

    if (selectedPrice === "dawn") {
      setValuePrice(rangePrices(item).dawn);
    }

    return () => {
      clearInterval(i);
    };
  }, [selectedPrice]);

  const dispatchUpdate = (newState: string) => {
    dispatch(
      updateStateAction(
        {
          id: item.id,
          hour,
          typeService: selectedPrice,
          newState,
        },
        token
      )
    );
  };

  const setNewState = (actualState: string) => {
    switch (actualState) {
      case disponible:
        dispatchUpdate(selectedState);
        break;
      case reservado:
        dispatchUpdate(ocupado);
        break;
      case ocupado:
        dispatchUpdate(alistamiento);
        break;
      case alistamiento:
        dispatchUpdate(disponible);
        break;
      case mantenimiento:
        dispatchUpdate(disponible);
        break;
    }
  };

  const handleClick = () => {
    changeTypeService({ type: "", idRoom: "" });
    socket.emit("rooms client");
    const body = {
      _id: `${item.id}${moment().format("DDMMyyyyHHmm")}`,
      date: `${moment().format("DD/MM/yyyy")}`,
      hour: `${hour}`,
      room: item.id,
      price: valuePrice,
      detail: textArea,
    };

    if (
      (item.state === disponible && selectedState === ocupado) ||
      item.state === reservado
    ) {
      changeTypeService({ type: selectedPrice, idRoom: item.id });
      dispatch(createServiceAction(token, body));
    }

    setNewState(item.state);
    socket.emit("history services client");

    openToast();
    closeModal();
  };

  const hanndleSelectPrice = (e: any) => {
    const val = e.target.value;
    setSelectedPrice(val);
  };

  const handleSelectedState = (e: any) => {
    const val = e.target.value;
    setSelectedState(val);
  };

  const handleConfirm = () => {
    dispatchUpdate(disponible)
    socket.emit("rooms client");
    closeModal()
  }

  return (
    <>
    <AlertConfirm 
    text='¿Está seguro de cancelar la reserva?'
    show={showAlert}
    setShow={setShowAlert}
    handleConfirm={handleConfirm}
    />
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Estado: </IonLabel>
              <Badge text={item.state} color={handleColor(item.state)} />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Tematica: </IonLabel>
              <IonLabel slot="end">{item.thematic}</IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>

        {item.state === disponible ? (
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Opciones</IonLabel>
                <IonSelect
                  placeholder="(opcional)"
                  interface="action-sheet"
                  cancelText="Cancelar"
                  onIonChange={handleSelectedState}
                  onIonCancel={() => setSelectedState(disponible)}
                >
                  {statesOptions.map(({ text, value }: any) => (
                    <IonSelectOption key={text} value={value}>
                      {text}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
        ) : (
          <IonRow></IonRow>
        )}

        {selectedState != mantenimiento && item.state === disponible && (
          <IonRow>
            <IonCol>
              <IonItem>
                <IonSelect
                  value={selectedPrice}
                  interface="action-sheet"
                  onIonChange={hanndleSelectPrice}
                >
                  <IonSelectOption value={"littleWhile"}>Rato</IonSelectOption>
                  <IonSelectOption value={"dawn"}>Amanecida</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel>{valuePrice}$</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
        )}

        {(selectedState === ocupado && item.state === disponible) ||
        selectedState === reservado ? (
          <IonRow>
            <IonCol>
              <h3>Detalle</h3>
              <IonTextarea
                clearOnEdit={true}
                placeholder="(Opcional)"
                value={textArea}
                onIonChange={(e: any) => setTextArea(e.detail.value!)}
              />
            </IonCol>
          </IonRow>
        ) : (
          <IonRow></IonRow>
        )}

        {item.state === reservado && (
          <IonRow>
            <IonCol>
              <IonButton expand="block" color="danger" fill="clear" onClick={() => setShowAlert(true)}>
                Cancelar reserva
              </IonButton>
            </IonCol>
          </IonRow>
        )}
        <IonRow>
          <IonCol size="6">
            <IonButton color="danger" expand="full" onClick={closeModal}>
              Cerrar
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton color="primary" expand="full" onClick={handleClick}>
              {textButton(item.state, selectedState)}
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default RoomContentModal;
