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
import { IconButton, useTheme } from "@mui/material";

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
import { createContext, useContext } from "react";
import Login from "./Login";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import {
  GlobalStateProvider,
  useGlobalState,
  GlobalStateInterface,
} from "./../GlobalStateProvider";

type Props = {
  type: "diets" | "drivers";
};

const Header: React.FC<Props> = ({ type }) => {
  const { navigate } = useContext(NavContext);

  const { state, setState } = useGlobalState();

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
            className="double-button-first"
            onClick={() => {
              navigate("/", "forward", "push");
            }}
          >
            Diety
          </IonButton>
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
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
