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
  setPostCode?: React.Dispatch<React.SetStateAction<string>>;
  setPostCodes?: React.Dispatch<React.SetStateAction<string[]>>;
  options: string[];
  multiple?: boolean;
};

const PostCodeAutocomplete: React.FC<Props> = ({
  setPostCode,
  setPostCodes,
  options,
  multiple = false,
}) => {
  const [open, setOpen] = React.useState(false);
  // const [options, setOptions] = React.useState<readonly string[]>([]);
  const loading = open && options.length === 0;

  // useEffect(() => {
  //   let active = true;

  //   if (!loading) {
  //     return undefined;
  //   }

  //   api.get("autocomplete/PostCodes").then((response) => {
  //     setOptions(response.data);
  //   });

  //   return () => {
  //     active = false;
  //   };
  // }, [loading]);

  // useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);

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
        if (setPostCode) {
          const val = value as string | null;
          setPostCode(val ?? "");
        }
        if (setPostCodes) {
          const val = value as string[] | null;
          setPostCodes(val ?? []);
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
          label="Kod pocztowy"
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

export default PostCodeAutocomplete;
