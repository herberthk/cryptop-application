"use client";
import AutoComplete from "@/components/AutoComplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { icons } from "@/data";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import { oswald } from "@/fonts";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

export default function Home() {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container maxWidth="lg">
      <Box
        maxWidth="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap={4}
      >
        <Typography
          className={oswald.className}
          variant="h3"
          mt={4}
          fontSize={{ md: "3rem", xs: "1.5rem" }}
          width={{ md: "70%", xs: "100%" }}
          textAlign="center"
          fontWeight="700"
        >
          Search and trade over 3 million tokens
        </Typography>
        <AutoComplete width={matchDownMd ? "100%" : "70%"} />
        <Box display="flex" mt={4} gap={2}>
          <Typography fontSize={22}>or</Typography>
          <Button variant="contained" sx={{ borderRadius: "20px" }}>
            Start trading
          </Button>
        </Box>
      </Box>
      <Stack
        spacing={4}
        mt={6}
        justifyContent="space-between"
        direction={{ md: "row", xs: "column" }}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          width={{ md: "67%", xs: "100%" }}
          padding={4}
          spacing={6}
          sx={{ boxShadow: "0 0 20px rgba(0,0,0,0.1)", borderRadius: "12px" }}
        >
          <Typography
            textAlign="center"
            className={oswald.className}
            variant="h4"
            fontWeight={700}
            fontSize={{ md: "3rem", xs: "1.5rem" }}
          >
            The widest coverage of tokens, networks and DEXs.
          </Typography>
          <Typography fontSize={20} textAlign="center">
            With over +3 million tokens, you will find even the freshest drops
            within minutes of hitting the chain.
          </Typography>
          <Box display="flex" gap={{ md: 3, xs: 1 }}>
            {icons.map(({ iconUrl, name }) => (
              <Box
                key={name}
                position="relative"
                sx={{ cursor: "pointer" }}
                width={40}
                height={40}
                component={motion.div}
                whileHover={{
                  transform: "translateY(-7px)",
                }}
              >
                <Image priority src={iconUrl} alt={name} title={name} fill />
              </Box>
            ))}
            <Box
              width={45}
              height={45}
              borderRadius={50}
              boxShadow="0 0 20px rgba(0,0,0,0.3)"
              alignItems="center"
              justifyContent="center"
              display="flex"
              component={motion.div}
              whileHover={{
                transform: "translateY(-7px)",
              }}
            >
              <Typography>+3M</Typography>
            </Box>
          </Box>
        </Stack>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          width={{ md: "30%", xs: "100%" }}
          padding={4}
          spacing={4}
          sx={{ boxShadow: "0 0 20px rgba(0,0,0,0.1)", borderRadius: "12px" }}
        >
          <Typography
            textAlign="center"
            className={oswald.className}
            variant="h5"
            fontWeight={700}
          >
            Deep liquidity, and the best trade rates.
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" gap={3}>
              <CheckCircleIcon fontSize="large" color="success" />
              <Typography fontSize={18}>Aggregated liquidity</Typography>
            </Box>
            <Box display="flex" gap={3}>
              <CheckCircleIcon fontSize="large" color="success" />
              <Typography fontSize={18}>Over 100+ DEXs</Typography>
            </Box>
            <Box display="flex" gap={3}>
              <CheckCircleIcon fontSize="large" color="success" />
              <Typography fontSize={18}>Smart order routing</Typography>
            </Box>
            <Box display="flex" gap={3}>
              <CheckCircleIcon fontSize="large" color="success" />
              <Typography fontSize={18}>Best execution</Typography>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}
