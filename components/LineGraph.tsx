import { LineGraphData } from "@/types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, { FC } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
Chart.register(...registerables);

type Props = {
  currentPrice?: string;
  setTimeperiod: React.Dispatch<React.SetStateAction<string>>;
  timeperiod?: string;
  showTimePeriod?: boolean;
  data: LineGraphData;
  dataChange?: number;
};

const LineGraph: FC<Props> = ({
  currentPrice,
  setTimeperiod,
  timeperiod,
  showTimePeriod = false,
  data,
  dataChange,
}) => {
  const time = ["3m", "3h", "24h", "7d", "30d", "1y", "3y", "5y"];

  return (
    <Stack
      boxShadow="0 0 20px rgba(0,0,0,0.1)"
      direction="column"
      borderRadius="20px"
      mt={1}
    >
      <Box
        p={2}
        gap={3}
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box display="flex" flexDirection="column">
          {currentPrice && (
            <Typography fontWeight="800" component="h1" fontSize={32}>
              ${currentPrice}
            </Typography>
          )}
          {dataChange && (
            <Typography
              fontWeight={700}
              color={dataChange < 0 ? "red" : "green"}
              fontSize={20}
            >
              {dataChange}%
            </Typography>
          )}
        </Box>
        {showTimePeriod && (
          <Box display="flex" gap={{ md: 2, xs: 1 }}>
            {time.map((t) => (
              <Box
                key={t}
                width={{ md: 40, xs: 30 }}
                height={{ md: 40, xs: 30 }}
                borderRadius={50}
                display="flex"
                boxShadow="0 0 20px rgba(0,0,0,0.3)"
                alignItems="center"
                justifyContent="center"
                sx={{ cursor: "pointer" }}
                component={motion.div}
                whileHover={{
                  transform: "translateY(-7px)",
                }}
                color={timeperiod === t ? "white" : "black"}
                bgcolor={timeperiod === t ? "#0071bd" : "white"}
                onClick={() => setTimeperiod(t)}
              >
                {t}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Line data={data} />
    </Stack>
  );
};

export default LineGraph;
