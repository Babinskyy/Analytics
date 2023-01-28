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
  setCompany: React.Dispatch<React.SetStateAction<string>>;
  company: string;
};
const CompanySelect: React.FC<Props> = ({ setCompany, company }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="delivery-type-select-label">Catering</InputLabel>
      <Select
        // className="shadow-mui"
        labelId="delivery-type-select-label"
        // id="delivery-type-select"
        style={{
          width: "250px",
          // textAlign: "left",
        }}
        value={company}
        label="Catering"
        // onChange={(e) => setStatus(e.target.value!)}
        onChange={(e) => {
          setCompany(e.target.value!);
        }}
      >
        <MenuItem value={"all"}>Wszystkie</MenuItem>
        <MenuItem value={"broccoli"}>Diety Od Brokuła</MenuItem>
        <MenuItem value={"cucumber"}>Pan Ogórek</MenuItem>
        <MenuItem value={"devil"}>Diabeł Z Pudełka</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CompanySelect;
