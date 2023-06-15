"use client";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Link from "next/link";
import AutoComplete from "./AutoComplete";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const showSearch = pathname.includes("/tokens");
  const showBackButton = pathname.includes("/order");
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Stack
        px={4}
        py={2}
        spacing={2}
        justifyContent="space-between"
        boxShadow="0 10px 30px rgba(0,0,0,0.2);"
        direction={{ md: "row", xs: "column" }}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Link href="/">
            <Typography fontSize={27} className="lobster">
              The Risk Protocol
            </Typography>
          </Link>
        </Box>

        {showSearch && (
          <AutoComplete home={false} width={matchDownMd ? "100%" : "40%"} />
        )}
        <Box display="flex" alignItems="center" justifyContent="center">
          {showBackButton ? (
            <Button
              sx={{
                borderRadius: "25px",
              }}
              variant="outlined"
              onClick={() => router.back()}
              startIcon={<ArrowBackIcon />}
            >
              back
            </Button>
          ) : (
            <Button
              sx={{
                borderRadius: "25px",
              }}
              variant="contained"
            >
              Connect wallet
            </Button>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default Header;
