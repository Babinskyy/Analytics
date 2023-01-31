import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Autocomplete,
  TextField,
  PaletteMode,
} from "@mui/material";
import {
  IonCol,
  IonContent,
  IonDatetime,
  IonModal,
  IonRow,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect } from "react";

import {
  GlobalStateProvider,
  useGlobalState,
  GlobalStateInterface,
} from "./../GlobalStateProvider";

type ContainerProps = {
  setMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
};

const Mode: React.FC<ContainerProps> = ({ setMode }) => {
  const { state, setState } = useGlobalState();

  useEffect(() => {
    setMode(state.mode ? state.mode : "light");

    console.log(state.mode);
  }, [state.mode]);

  return <>{state.mode}</>;
};

export default Mode;
