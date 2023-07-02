import {
  IonCol,
  IonModal,
  IonRow,
  NavContext,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import api from "./../services/api";
import auth from "./../services/auth.service";
import { User } from "./../services/userProps";

interface ContainerProps {}

const Login: React.FC<ContainerProps> = () => {
  const { navigate } = useContext(NavContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [present] = useIonAlert();
  const [presentLoading, dismissLoading] = useIonLoading();

  const [showLogin, setShowLogin] = useState(false);
  const modalRef = useRef<HTMLIonModalElement>(null);

  const [canDismiss, setCanDismiss] = useState(false);

  useEffect(() => {
    const _GetUser = async () => {
      const user = await auth.getCurrentUser();

      if (user == undefined) {
        setShowLogin(true);
      }
    };

    _GetUser();
  }, []);

  return (
    <>
      {/* <IonModal
        ref={modalRef}
        isOpen={showLogin}
        canDismiss={canDismiss}
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

                  const data = response as User;


                  console.log("dismiss")

                  dismissLoading();

                  if (data.jwtToken) 
                  {
                    setCanDismiss(true);
                    setShowLogin(false);

                    window.location.reload();

                  } else {
                    present("Niepoprawne dane logowanie", [
                      { text: "Zamknij" },
                    ]);
                  }
                })
                .catch((exception) => {
                  setShowLogin(false);
                  dismissLoading();
                  present("Niepoprawne dane logowanie", [{ text: "Zamknij" }]);
                });
            }} >
              Zaloguj się
            </Button>
            </IonCol>
          </IonRow>
        </div>
      </IonModal> */}
    </>
  );
};

export default Login;
