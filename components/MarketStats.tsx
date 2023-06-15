import { CyptoDetails } from "@/types";
import Stack from "@mui/material/Stack";
import React, { FC } from "react";
import millify from "millify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type Props = {
  cryptoDetails: CyptoDetails["data"]["coin"];
};
const MarketStats: FC<Props> = ({ cryptoDetails }) => {
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(+cryptoDetails?.price!)}`,
    },
    { title: "Market Cap Rank", value: cryptoDetails?.rank },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.["24hVolume"] && millify(+cryptoDetails?.["24hVolume"])
      }`,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(+cryptoDetails?.marketCap)
      }`,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(+cryptoDetails?.allTimeHigh?.price)
      }`,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(+cryptoDetails?.supply?.total)
      }`,
    },
  ];

  return (
    <Stack
      boxShadow="0 0 20px rgba(0,0,0,0.1)"
      direction="column"
      borderRadius="20px"
      mt={3}
      p={3}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        gap={8}
      >
        {stats.map(({ title, value }) => (
          <Box
            key={title}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={2}
          >
            <Typography>{title}</Typography>
            <Typography fontWeight="800" fontSize={20}>
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default MarketStats;
