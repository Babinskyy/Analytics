import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";


/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
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
import "./theme/variables.css";

import "./theme/Global.scss";

import "./theme/fonts.css";
import Day from "./pages/Day";
import Month from "./pages/Month";
import Year from "./pages/Year";
import Driver from "./pages//Driver";
import Drivers from "./pages//Drivers";



setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
      <Route exact path="/drivers">
          <Drivers />
        </Route>
      <Route exact path="/driver">
          <Driver />
        </Route>
        <Route exact path="/day">
          <Day />
        </Route>
        <Route exact path="/month">
          <Month />
        </Route>
        <Route exact path="/year">
          <Year />
        </Route>
        <Route exact path="/">
          <Redirect to="/Year" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
