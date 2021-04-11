import React, { useState } from "react";

import {
  IonAlert,
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";

import StandardPage from "../components/templates/StandardPage";
import { useHistory } from "react-router";

import { createProductAction } from "../redux/barDucks";
import { useDispatch } from "react-redux";

import { cookieGet } from "../services/cookies.service";
import Toast from "../components/Atoms/Toast";

import { socket } from "../services/sockets.service";

const dataInit = {
  name: "",
  stock: 0,
  price: 0,
};

const CreateProducPage: React.FC = () => {
  const [data, setData] = useState(dataInit);

  const [showToast, setShowToast] = useState(false);

  const [error, setError] = useState({ state: false, message: "" });

  const dispatch = useDispatch();

  const history = useHistory();

  const updateFiled = (e: any) => {
    const a = /^\d*$/;
    setData({
      ...data,
      [e.target.name]:
        a.test(e.target.value) && e.target.value !== 0
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    if (!data.name) {
      setError({
        state: true,
        message: "Ingrese el nombre del producto",
      });
      return;
    }

    if (data.stock <= 0) {
      setError({
        state: true,
        message: "Ingrese el la cantidad",
      });
      return;
    }

    if (data.price <= 0) {
      setError({
        state: true,
        message: "Ingrese el precio",
      });
      return;
    }

    dispatch(createProductAction(cookieGet("token"), data));
    socket.emit('products client')
    setData(dataInit);
    setShowToast(true);
  };

  return (
    <StandardPage title="Nuevo Producto">
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonAlert
              isOpen={error.state}
              onDidDismiss={() => setError({ state: false, message: "" })}
              header={"Error!"}
              message={error.message}
              buttons={["cerrar"]}
            />
          </IonCol>
        </IonRow>

        <form onSubmit={handleClick}>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Nombre del producto</IonLabel>
                <IonInput
                  name="name"
                  type="text"
                  value={data.name}
                  onIonChange={updateFiled}
                  clearInput
                />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">agregar cantidad</IonLabel>
                <IonInput
                  name="stock"
                  type="number"
                  value={data.stock}
                  onIonChange={updateFiled}
                  clearInput
                />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Precio unitario</IonLabel>
                <IonInput
                  name="price"
                  type="number"
                  value={data.price}
                  onIonChange={updateFiled}
                  clearInput
                />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton expand="block" type="submit">
                Crear
              </IonButton>
            </IonCol>
          </IonRow>
        </form>

        <IonRow>
          <IonCol>
            <IonButton
              expand="block"
              color="danger"
              fill="clear"
              onClick={() => history.push("/options")}
            >
              Cancelar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
      <Toast
        set={setShowToast}
        show={showToast}
        message="Producto creado con exito"
        duration={1000}
      />
    </StandardPage>
  );
};

export default CreateProducPage;
