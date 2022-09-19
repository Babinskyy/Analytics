import { Redirect, Route } from "react-router-dom";
import { IonApp, IonCol, IonModal, IonRouterOutlet, IonRow, NavContext, setupIonicReact, useIonAlert, useIonLoading } from "@ionic/react";
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
import { Button, TextField } from "@mui/material";

import auth from "./services/auth.service";

import { User } from "./services/userProps";
import { useContext, useEffect, useState } from "react";


setupIonicReact();

const App: React.FC = () => {

  const { navigate } = useContext(NavContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [present] = useIonAlert();
  const [presentLoading, dismissLoading] = useIonLoading();

  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {

    const _GetUser = async () => {

      const user = await auth.getCurrentUser();

      if(user == undefined)
      {
        setShowLogin(true);
      }


    }

    _GetUser();

  })

  return(
    <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/drivers">
          <Drivers />
        </Route>
        <Route exact path="/driver">
          <Driver />
        </Route>
        <Route exact path="/day/:month/:id" component={Day} />
        <Route exact path="/month/:id" component={Month} />
        <Route exact path="/year">
          <Year />
        </Route>

        <Route exact path="/">
          <Redirect to="/Year" />
        </Route>
      </IonRouterOutlet>

      <IonModal
        isOpen={showLogin}
        canDismiss={false}
        mode="ios"
        style={{
          "--height": "auto",
        }}
      >
        <div style={{
          display: "grid",
          padding: "5px 10px 20px"
        }}>
          <IonRow>
            <IonCol><h2
            style={{
              textAlign: "center",
            }}
          >
            Logowanie
          </h2></IonCol>
          </IonRow>
          <IonRow style={{
            marginTop: "10px"
          }}>
            <IonCol>
              <TextField style={{
                width: "100%"
              }} id="login" label="Nazwa użytkownika" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
            </IonCol>
          </IonRow>
          <IonRow style={{
            marginTop: "10px"
          }}>
            <IonCol>
            <TextField style={{
              width: "100%"
            }} id="password" label="Hasło" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </IonCol>
          </IonRow>
          <IonRow style={{
            marginTop: "25px"
          }}>
            <IonCol>
            <Button fullWidth variant="contained" size="large" onClick={async () => {
              presentLoading({
                spinner: "crescent",
                message: "Logowanie...",
                duration: 10000,
              });

              // navigate("/Home", "forward", "replace")

              await auth
                .login(username, password)
                .then(async (response) => {
                  console.log(auth);

                  const data = response as User;

                  dismissLoading();

                  if (data.jwtToken) 
                  {
                    setShowLogin(false);
                  } else {
                    present("Niepoprawne dane logowanie", [
                      { text: "Zamknij" },
                    ]);
                  }
                })
                .catch((exception) => {
                  dismissLoading();
                  present("Niepoprawne dane logowanie", [{ text: "Zamknij" }]);
                });
            }} >
              Zaloguj się
            </Button>
            </IonCol>
          </IonRow>
        </div>
      </IonModal>
    </IonReactRouter>
  </IonApp>
  )

};

export default App;
