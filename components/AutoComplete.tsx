import React, { FC } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { Tokens } from "@/data";
import { Token } from "@/types";
import { useRouter } from "next/navigation";
import { updateBaseToken } from "@/services/tokenSlice";
import { useAppDispatch } from "@/store";
import Stack from "@mui/material/Stack";

type Props = {
  width?: string;
  home?: boolean;
};

const AutoComplete: FC<Props> = ({ width = "70%", home = true }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onChange = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: Token | null
  ) => {
    if (home) {
      dispatch(updateBaseToken(newValue!));
      router.push(`/tokens/${newValue?.name.toLowerCase()}/${newValue?.token}`);
    }
    if (!home) {
      dispatch(updateBaseToken(newValue!));
    }
  };
  return (
    <Stack
      direction="column"
      mt={3}
      sx={{ boxShadow: "0 0 40px rgba(0,0,0,0.3)", width }}
    >
      <Autocomplete
        autoHighlight
        options={Tokens}
        getOptionLabel={(option) => option.name}
        onChange={onChange}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <Image
              width={35}
              height={35}
              src={option.iconUrl}
              alt={option.name}
            />
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Seach token name, token symbol or address"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: <SearchIcon />,
            }}
          />
        )}
      />
    </Stack>
  );
};

export default AutoComplete;
