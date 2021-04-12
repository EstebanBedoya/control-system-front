import React, { FC, useEffect, useState } from "react";

// imports redux
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../redux/authDucks";

import { useHistory } from "react-router-dom";

// imports ionic components
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonLabel,
  IonContent,
  IonButton,
  IonGrid,
  IonAlert,
  IonLoading,
} from "@ionic/react";

const AuthPage: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const history = useHistory();

  useEffect(() => {
    validate();
  }, [auth]);

  const validate = () => {
    setTimeout(() => {
      setShowLoading(false);
    }, 2000);
    if (auth.token !== "nope" && auth.token !== "") {
      history.push("/rooms");
      // console.log('estoy dentro :V')
      return;
    }
    if (auth.token === "nope") {
      setMessageError("usuario o contraseña invalida");
      setIsError(true);
      return;
    }
  };


  const handleLogin = () => {
    setShowLoading(true);
    if (!username) {
      setMessageError("Por favor ingrese el usuario");
      setIsError(true);
      return;
    }

    if (!password) {
      setMessageError("Por favor ingrese la contraseña");
      setIsError(true);
      return;
    }

    dispatch(loginAction(username, password));

    setUsername("");
    setPassword("");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={isError}
                onDidDismiss={() => setIsError(false)}
                header={"Error!"}
                message={messageError}
                buttons={["cerrar"]}
              />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Usuario</IonLabel>
                <IonInput
                  type="text"
                  value={username}
                  onIonChange={(e) => setUsername(e.detail.value!)}
                />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Contraseña</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleLogin}>
                Ingresar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {!isError && (
          <IonLoading
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Ingresando ..."}
            duration={2000}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default AuthPage;
