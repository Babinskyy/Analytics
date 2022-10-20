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
import { useContext } from "react";
import Login from "./Login";

type Props = {
  type: "diets" | "drivers";
};

const Header: React.FC<Props> = ({ type }) => {
  const { navigate } = useContext(NavContext);

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
          <IonButton
            onClick={() => {
              const bodyClasses = document.querySelector("body");

              if (bodyClasses?.classList.contains("dark")) {
                document.body.classList.remove("dark");
              } else {
                document.body.classList.add("dark");
              }
            }}
            style={{ marginRight: "15px" }}
          >
            <IonIcon icon={moon} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
