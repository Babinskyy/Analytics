import { IonCol, IonGrid, IonRow, isPlatform } from "@ionic/react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
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
import { GenerateGUID } from "../services/Utility";

import api from "./../services/api";

// import { v4 as uuidv4, v4 } from "uuid";

type Props = {
  setStreet?: React.Dispatch<React.SetStateAction<string>>;
  setStreets?: React.Dispatch<React.SetStateAction<string[]>>;
  options: string[];
  multiple?: boolean;
};

const StreetAutocomplete: React.FC<Props> = ({
  setStreet,
  setStreets,
  options,
  multiple = false,
}) => {
  const [open, setOpen] = React.useState(false);

  const loading = open && options.length === 0;

  return (
    <Autocomplete
      multiple={multiple}
      noOptionsText="Nie znaleziono"
      // id={v4()}
      sx={{
        width: {
          xs: "100%",
          sm: "100%",
          md: "auto",
        },
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option === value}
      getOptionLabel={(option) => {
        return option;
      }}
      onChange={(event, value) => {
        if (setStreet) {
          const val = value as string | null;
          setStreet(val ?? "");
        }
        if (setStreets) {
          const val = value as string[] | null;
          setStreets(val ?? []);
        }
      }}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          variant="outlined"
          type={"search"}
          className="shadow-mui"
          {...params}
          id={GenerateGUID()}
          autoComplete={GenerateGUID()}
          label="Ulica"
          InputProps={{
            ...params.InputProps,
            autoComplete: "off",
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default StreetAutocomplete;
