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

import api from "./../services/api";

// import { v4 as uuidv4, v4 } from "uuid";

type Props = {
  setDriver: React.Dispatch<React.SetStateAction<string>>;
  width?: string;
  fullWidth?: boolean;
};

const DriversAutocomplete: React.FC<Props> = ({
  setDriver,
  width,
  fullWidth = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly string[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    api.get("autocomplete/drivers").then((response) => {
      setOptions(response.data);
    });

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      onFocus={(event) => {
        const target = event.target as HTMLInputElement;
        if (target.autocomplete) {
          target.autocomplete = "whatever";
        }
      }}
      noOptionsText="Nie znaleziono"
      // id={v4()}
      sx={{
        width: {
          xs: "100%",
          sm: "100%",
          md: width ? width : 300,
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
        setDriver(value ?? "");
      }}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          variant="filled"
          type={"search"}
          className="shadow-mui"
          {...params}
          label="Kierowca"
          fullWidth={true}
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

export default DriversAutocomplete;
