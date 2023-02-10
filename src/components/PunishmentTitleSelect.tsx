import { IonCol, IonGrid, IonRow, isPlatform } from "@ionic/react";
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
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
  setPunishmentTitle?: React.Dispatch<React.SetStateAction<string>>;
  setPunishmentTitles?: React.Dispatch<React.SetStateAction<string[]>>;
  punishmentTitle: string | string[];
  options: string[];
  multiple?: boolean;
};

const PunishmentTitleSelect: React.FC<Props> = ({
  setPunishmentTitle,
  setPunishmentTitles,
  punishmentTitle,
  options,
  multiple = false,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof punishmentTitle>) => {
    const {
      target: { value },
    } = event;
    if (setPunishmentTitle) {
      const val = value as string | null;
      setPunishmentTitle(val ?? "");
    }
    if (setPunishmentTitles) {
      const val = value as string[] | null;
      setPunishmentTitles(val ?? []);
    }
  };

  const loading = open && options.length === 0;

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="punishment-title-select">Tytuł</InputLabel>
      <Select
        labelId="punishment-title-select"
        input={<OutlinedInput label="Name" />}
        multiple={multiple}
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
        onChange={handleChange}
        value={
          setPunishmentTitle
            ? (punishmentTitle as string)
            : (punishmentTitle as string[])
        }
      >
        {options.map((e) => {
          return (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default PunishmentTitleSelect;
