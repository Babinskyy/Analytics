import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonCol,
  IonModal,
  IonRouterOutlet,
  IonRow,
  NavContext,
  setupIonicReact,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
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

import "./theme/Responsive.scss";

import "./theme/Darek.scss";

import "bootstrap/dist/css/bootstrap.min.css";

import "./theme/fonts.css";
import Day from "./pages/Day";
import Month from "./pages/Month";
import Year from "./pages/Year";
import Driver from "./pages//Driver";
import Drivers from "./pages//Drivers";
import {
  Button,
  createTheme,
  PaletteMode,
  TextField,
  ThemeProvider,
} from "@mui/material";

import auth from "./services/auth.service";

import { User } from "./services/userProps";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Login from "./components/Login";
import { useTheme } from "@emotion/react";
import Mode from "./theme/Mode";

setupIonicReact();

const ColorModeContext = createContext({ toggleColorMode: () => {} });

type MyAppProps = {
  setMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
};

const MyApp: React.FC<MyAppProps> = ({ setMode }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <>
      <Mode setMode={setMode} />
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/drivers">
              <Drivers />
            </Route>

            <Route exact path="/driver/:id" component={Driver} />
            <Route exact path="/day/:month/:id" component={Day} />
            <Route exact path="/month/:id" component={Month} />
            <Route exact path="/" component={Year} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </>
  );
};

const App: React.FC = () => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp setMode={setMode} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
