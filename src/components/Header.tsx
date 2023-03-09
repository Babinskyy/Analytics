import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  NavContext,
} from "@ionic/react";
import { Button, IconButton, useTheme } from "@mui/material";

import {
  arrowUpOutline,
  cameraOutline,
  caretForward,
  caretForwardOutline,
  checkmarkOutline,
  chevronForwardOutline,
  handRight,
  moon,
  moonOutline,
  reorderFourOutline,
} from "ionicons/icons";
import { createContext, useContext, useEffect, useState } from "react";
import Login from "./Login";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import {
  GlobalStateProvider,
  useGlobalState,
  GlobalStateInterface,
} from "./../GlobalStateProvider";

import auth from "./../services/auth.service";
import { User } from "../services/userProps";

type Props = {
  type: "diets" | "drivers";
};

const Header: React.FC<Props> = ({ type }) => {
  const { navigate } = useContext(NavContext);

  const { state, setState } = useGlobalState();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const _GetUser = async () => {
      const user = await auth.getCurrentUser();

      setUser(user);
    };

    _GetUser();
  }, []);

  return (
    <IonHeader>
      <IonToolbar>
        <Login />

        {/* <IonButtons slot="start">
          <IonBackButton />
        </IonButtons> */}
        <IonTitle>
          <IonButton
            fill={type == "diets" ? "solid" : "outline"}
            color="tertiary"
            className={
              user?.role == "Admin"
                ? "double-button-first"
                : "double-button-first-non-admin"
            }
            onClick={() => {
              navigate("/", "forward", "push");
            }}
          >
            Diety
          </IonButton>
          {user?.role == "Admin" ? (
            <IonButton
              className="double-button-second"
              fill={type == "drivers" ? "solid" : "outline"}
              color="tertiary"
              onClick={() => {
                navigate("/drivers", "forward", "push");
              }}
            >
              Kierowcy
            </IonButton>
          ) : (
            <></>
          )}
        </IonTitle>
        <IonButtons slot="end">
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => {
              const bodyClasses = document.querySelector("body");

              if (bodyClasses?.classList.contains("dark")) {
                document.body.classList.remove("dark");
              } else {
                document.body.classList.add("dark");
              }

              setState((prev) => ({
                ...prev,
                ...{
                  mode: state.mode === "dark" ? "light" : "dark",
                },
              }));
            }}
            color="inherit"
          >
            {state.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button
            sx={{ margin: "0 15px" }}
            color="error"
            variant="contained"
            onClick={async () => {
              auth.logout().finally(() => {
                setTimeout(() => {
                  window.location.reload();
                }, 1);
              });
            }}
          >
            Wyloguj
          </Button>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
