import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Tokens } from "@/data";
import { Token } from "@/types";
import Image from "next/image";
import { updateQuoteToken } from "@/services/tokenSlice";
import { useAppDispatch } from "@/store";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormModal: React.FC<Props> = ({ openModal, setOpenModal }) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleListItemClick = (value: Token) => {
    dispatch(updateQuoteToken(value));
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={openModal}>
      <DialogTitle>Select token</DialogTitle>
      <List sx={{ pt: 0 }}>
        {Tokens.map((t) => (
          <ListItem key={t.id} disableGutters>
            <ListItemButton onClick={() => handleListItemClick(t)}>
              <ListItemAvatar>
                <Image width={35} height={35} src={t.iconUrl} alt={t.name} />
              </ListItemAvatar>
              <ListItemText primary={t.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default FormModal;
