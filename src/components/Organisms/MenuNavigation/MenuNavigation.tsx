import React, { FC } from "react";
// import { useSelector } from "react-redux";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { bedOutline, readerOutline, logOutOutline, beerOutline } from "ionicons/icons";

import { useHistory, useRouteMatch } from "react-router-dom";

import { cookieRemove, cookieGet } from "../../../services/cookies.service";

const MenuNavigation: FC = () => {
  const roles = cookieGet("role");
  const history = useHistory();
  const match = useRouteMatch("/auth");

  const logOut = () => {
    cookieRemove("token");
    cookieRemove("role");
    history.push('/auth')
  };

  const role = roles?.find(
    (role: any) => role === "admin" || role === "moderator"
  );

  // const role = 'admin'
  return (
    <>
      <IonMenu
        side="end"
        menuId="menu"
        contentId="id"
        disabled={match?.isExact}
        type="push"
        hidden={false}
        swipeGesture={true}
        maxEdgeStart={100}
      >
        <IonHeader>
          <IonToolbar color="secondary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonList>
            <IonMenuToggle menu='menu'>
              <IonItem button routerLink="/rooms">
                <IonLabel>
                  <IonIcon icon={bedOutline} /> Habitaciones
                </IonLabel>
              </IonItem>

              <IonItem button routerLink="/products">
                <IonLabel>
                  <IonIcon icon={beerOutline} /> Productos
                </IonLabel>
              </IonItem>

              {role === "admin" && (
                <IonItem button routerLink="/options">
                  <IonLabel>
                    <IonIcon icon={readerOutline} /> Opciones
                  </IonLabel>
                </IonItem>
              )}

              <IonItem button onClick={logOut}>
                <IonLabel>
                  <IonIcon icon={logOutOutline} /> cerrar sesión
                </IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
      )
    </>
  );
};

export default MenuNavigation;
