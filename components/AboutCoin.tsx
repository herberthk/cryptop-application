import { CyptoDetails } from "@/types";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { FC } from "react";
import HTMLReactParser from "html-react-parser";
import Box from "@mui/material/Box";
import Link from "next/link";

type Props = {
  cryptoDetails: CyptoDetails["data"]["coin"];
};

const AboutCoin: FC<Props> = ({ cryptoDetails }) => {
  return (
    <Stack
      boxShadow="0 0 20px rgba(0,0,0,0.1)"
      direction="column"
      borderRadius="20px"
      mt={3}
      p={3}
    >
      <Typography fontWeight="800" fontSize={20}>
        About {cryptoDetails?.name}
      </Typography>
      <Typography mt={2}>
        {HTMLReactParser(cryptoDetails?.description)}
      </Typography>
      <Box
        display="flex"
        borderTop="1px solid #ccc"
        pt={1}
        mt={2}
        flexDirection="column"
      >
        <Typography fontWeight="800">Links</Typography>
        <Box
          display="flex"
          gap={2}
          mt={1}
          flexDirection={{ md: "row", xs: "column" }}
        >
          {cryptoDetails?.links.map(({ name, url }) => (
            <Link key={name} href={url} target="_blank">
              <Box bgcolor="#ccc" borderRadius={10} py={1} px={2}>
                {name}
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Stack>
  );
};

export default AboutCoin;
