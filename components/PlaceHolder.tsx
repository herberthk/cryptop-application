import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import React, { FC } from "react";
import Skeleton from "@mui/material/Skeleton";

type Status = "error" | "loading";

type LoderProps = {
  orderBook?: boolean;
};

interface Props extends LoderProps {
  status: Status;
}

const Loading: FC<LoderProps> = ({ orderBook = false }) => {
  if (orderBook) {
    return (
      <Stack
        spacing={2}
        justifyContent="space-between"
        direction={{ md: "row", xs: "column" }}
      >
        <Skeleton
          variant="rectangular"
          style={{
            marginTop: "2rem",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            height: "70vh",
          }}
          width="100%"
        />
      </Stack>
    );
  }
  return (
    <Stack
      spacing={2}
      justifyContent="space-between"
      direction={{ md: "row", xs: "column" }}
    >
      <Stack width={{ md: "60%", xs: "100%" }} direction="column" py={3}>
        <Skeleton
          variant="rectangular"
          style={{
            marginTop: "2rem",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
            borderRadius: "12px",
          }}
          width="100%"
          height={330}
        />
        <Skeleton
          variant="rectangular"
          style={{
            marginTop: "2rem",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
            borderRadius: "12px",
          }}
          width="100%"
          height={260}
        />
      </Stack>
      <Stack direction="column" width={{ md: "38%", xs: "100%" }} spacing={4}>
        <Skeleton
          variant="rectangular"
          style={{
            marginTop: "2.7rem",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
            borderRadius: "12px",
          }}
          width="100%"
          height={400}
        />
      </Stack>
    </Stack>
  );
};

const Error = () => {
  return (
    <Stack
      alignItems="center"
      direction="column"
      justifyContent="center"
      sx={{ boxShadow: "0 0 20px rgba(0,0,0,0.1)", borderRadius: "12px" }}
      py={3}
      mt={4}
      spacing={3}
    >
      <Typography variant="h4">Sorry something went wrong</Typography>
      <Typography variant="h5">
        You can check your internet connection and refresh the page
      </Typography>
    </Stack>
  );
};
const PlaceHolder: FC<Props> = ({ status, orderBook }) => {
  return (
    <Container maxWidth="lg">
      {status === "loading" ? <Loading orderBook={orderBook} /> : <Error />}
    </Container>
  );
};

export default PlaceHolder;
