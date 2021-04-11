import React from "react";

// navigation
import { IonApp, IonRouterOutlet } from "@ionic/react";

// redux store
import generateStore from "./redux/store";
import { Provider } from "react-redux";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

// /* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
// import "./theme/variables.css";

import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import routes from "./config/routes";
import MenuNavigation from "./components/Organisms/MenuNavigation";

const App: React.FC = () => {
  const store = generateStore();

  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <MenuNavigation />
          <IonRouterOutlet id="id">
            {routes.map((route: any, i: number) => (
              <Route key={i} {...route} exact={true} />
            ))}
            <Route
              path="/"
              render={() => <Redirect to="/auth" />}
              exact={true}
            />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

export default App;
