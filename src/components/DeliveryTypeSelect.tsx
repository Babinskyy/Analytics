import { IonCol, IonGrid, IonRow, isPlatform } from "@ionic/react";
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, {
  ChangeEvent,
  forwardRef,
  ReactNode,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import api from "./../services/api";

// import { v4 as uuidv4, v4 } from "uuid";
type Props = {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  status: string;
};

const DeliveryTypeSelect: React.FC<Props> = ({ setStatus, status }) => {
  // const [status, setStatus] = useState<string>("all");

  return (
    <FormControl fullWidth>
      <InputLabel id="delivery-type-select-label">Status dostaw</InputLabel>
      <Select
        // className="shadow-mui"
        labelId="delivery-type-select-label"
        // id="delivery-type-select"
        style={{
          width: "250px",
          // textAlign: "left",
        }}
        value={status}
        label="Status dostaw"
        // onChange={(e) => setStatus(e.target.value!)}
        onChange={(e) => {
          setStatus(e.target.value!);
        }}
      >
        <MenuItem value={"all"}>Wszystkie</MenuItem>
        <MenuItem value={"realized"}>Zrealizowane</MenuItem>
        <MenuItem value={"unrealized"}>Niezralizowane</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DeliveryTypeSelect;
