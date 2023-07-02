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

type Option = {
  id: string;
  value: string;
};

const DriversAutocomplete: React.FC<Props> = ({
  setDriver,
  width,
  fullWidth = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Option[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    // api.get("autocomplete/drivers").then((response) => {
    //   setOptions(response.data);
    //   console.log(response.data);
    // });
    // console.log(options);

    setOptions([
      { id: "P0001", value: "120" },
      { id: "P0001", value: "12s" },
      { id: "P0001", value: "44j" },
      { id: "P0001", value: "52s" },
      { id: "P0001", value: "66l" },
      { id: "P0001", value: "90a" },
      { id: "P0001", value: "55e" },
      { id: "P0001", value: "52w" },
      { id: "P0001", value: "54q" },
      { id: "P0001", value: "73m" },
      { id: "P0001", value: "23q" },
      { id: "P0001", value: "74p" },
      { id: "P0001", value: "89b" },
      { id: "P0001", value: "12a" },
      { id: "P0001", value: "71a" },
      { id: "P0001", value: "12s" },
    ]);

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
        return option.value;
      }}
      onChange={(event, value) => {
        setDriver(value?.value ?? "");
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
