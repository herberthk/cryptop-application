import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { FC, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Token } from "@/types";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormModal from "./CustomModal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  baseToken: Token;
  quoteToken: Token;
};

const ConnectBox: FC<Props> = ({ baseToken, quoteToken }) => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  // This is the right time to call smart-contract function to connect wallet
  const connectToWallet = () => {
    if (!baseToken || !quoteToken) {
      toast.error("Please select payment and receiving token", {
        closeOnClick: true,
        progress: undefined,
      });
      return;
    }
    if (baseToken.token === quoteToken.token) {
      toast.error("Paying and receiving token should be different", {
        closeOnClick: true,
        progress: undefined,
      });
      return;
    }
    return router.push("/order");
  };

  return (
    <>
      <FormModal openModal={openModal} setOpenModal={setOpenModal} />
      <Box
        display="flex"
        justifyContent="space-between"
        pt={2}
        px={2}
        pb={1}
        borderBottom="1px solid #ccc"
      >
        <Box display="flex" gap={3}>
          <Typography fontWeight="800">Market</Typography>
          <Typography fontWeight="800" color="#ccc">
            Limit
          </Typography>
        </Box>
        <IconButton aria-label="Settings">
          <SettingsIcon />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        pt={2}
        px={2}
        pb={1}
        borderBottom="1px solid #ccc"
      >
        <Typography fontWeight="600" pl={1}>
          Pay with
        </Typography>
        <Box
          display="flex"
          mt={1.4}
          justifyContent="space-between"
          gap={1}
          flexDirection={{ md: "row", xs: "column" }}
        >
          {!quoteToken ? (
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "none", borderRadius: "20px" }}
              endIcon={<ExpandMoreIcon />}
              onClick={() => setOpenModal(true)}
            >
              Select token
            </Button>
          ) : (
            <Box
              display="flex"
              gap={1}
              py={0.5}
              sx={{ cursor: "pointer" }}
              px={2}
              bgcolor="#ccc6"
              borderRadius="15px"
              maxWidth="max-content"
              onClick={() => setOpenModal(true)}
            >
              <Image
                src={quoteToken.iconUrl}
                alt={quoteToken.name}
                width={20}
                height={20}
                priority
              />
              <Typography fontWeight={800} textTransform="uppercase">
                {quoteToken.code}
              </Typography>
              <ExpandMoreIcon />
            </Box>
          )}

          <Box display="flex" gap={1}>
            <Box
              py={0.5}
              sx={{ cursor: "pointer" }}
              px={2}
              bgcolor="#ccc6"
              borderRadius="15px"
            >
              MAX
            </Box>
            <Box
              py={0.5}
              sx={{ cursor: "pointer" }}
              px={2}
              bgcolor="#ccc6"
              borderRadius="15px"
            >
              50%
            </Box>
            <Box
              py={0.5}
              sx={{ cursor: "pointer" }}
              px={2}
              bgcolor="#ccc6"
              borderRadius="15px"
            >
              CLEAR
            </Box>
          </Box>
        </Box>
        <Typography mt={2} pl={1} fontWeight="800" fontSize={30} color="#ccc">
          0.0
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        pt={2}
        px={2}
        pb={1}
        borderBottom="1px solid #ccc"
      >
        <Box display="flex" justifyContent="space-between">
          <Typography pl={1} fontWeight="800">
            You receive
          </Typography>
          <Typography>Balance:-</Typography>
        </Box>
        <Box
          display="flex"
          gap={1}
          py={0.5}
          sx={{ cursor: "pointer" }}
          px={2}
          bgcolor="#ccc6"
          borderRadius="15px"
          mt={1.4}
          maxWidth="max-content"
        >
          <Image
            src={baseToken.iconUrl}
            alt={baseToken.name}
            width={20}
            height={20}
            priority
          />
          <Typography fontWeight={800} textTransform="uppercase">
            {baseToken.code}
          </Typography>
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography pl={1} fontWeight="800" fontSize={30} color="#ccc">
            0.0
          </Typography>
          <Typography fontWeight="800" fontSize={20} color="#ccc">
            $0.0
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        pt={3}
        px={2}
        pb={4}
        borderBottom="1px solid #ccc"
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "25px",
          }}
          size="large"
          onClick={connectToWallet}
        >
          Connect wallet
        </Button>
      </Box>
    </>
  );
};

export default ConnectBox;
