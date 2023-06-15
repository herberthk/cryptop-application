"use client";
import { useTypedSelector } from "@/store";
import Container from "@mui/material/Container";
import millify from "millify";
import { Oswald } from "next/font/google";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import LineGraph from "@/components/LineGraph";
import { useEffect, useState } from "react";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "@/services/cryptoApi";
import MarketStats from "@/components/MarketStats";
import AboutCoin from "@/components/AboutCoin";
import PlaceHolder from "@/components/PlaceHolder";
import ConnectBox from "@/components/ConnectBox";
import { useRouter } from "next/navigation";

const oswald = Oswald({ weight: "700", subsets: ["latin"] });

const Page = () => {
  const router = useRouter();
  const baseToken = useTypedSelector((state) => state.token.baseToken);
  const quoteToken = useTypedSelector((state) => state.token.quoteToken);
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching, isError } = useGetCryptoDetailsQuery(
    baseToken?.id!
  );
  const {
    data: coinHistory,
    isFetching: isCoinHistoryFetching,
    isError: isHistoryError,
  } = useGetCryptoHistoryQuery({
    coinId: baseToken?.id!,
    timeperiod,
  });
  const cryptoDetails = data?.data?.coin;

  useEffect(() => {
    if (!baseToken) {
      router.push("/");
    }
  }, []);

  if (isFetching || isCoinHistoryFetching) {
    return <PlaceHolder status="loading" />;
  }

  if (isError || isHistoryError) {
    return <PlaceHolder status="error" />;
  }

  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length!; i += 1) {
    coinPrice.push(+coinHistory?.data?.history[i].price!);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length!; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp!).toLocaleDateString()
    );
  }

  const lineData = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      <Stack
        spacing={2}
        justifyContent="space-between"
        direction={{ md: "row", xs: "column" }}
      >
        <Stack width={{ md: "60%", xs: "100%" }} direction="column" py={3}>
          <Stack direction="row" gap={2}>
            <Image
              src={baseToken?.iconUrl!}
              width={30}
              height={30}
              alt={baseToken?.name!}
              title={baseToken?.name}
            />
            <Typography
              className={oswald.className}
              variant="h5"
              fontWeight="700"
            >
              {baseToken?.name}
            </Typography>
          </Stack>
          <LineGraph
            data={lineData}
            currentPrice={millify(+cryptoDetails?.price!)}
            setTimeperiod={setTimeperiod}
            timeperiod={timeperiod}
            showTimePeriod={true}
            dataChange={+coinHistory?.data?.change!}
          />
          <MarketStats cryptoDetails={cryptoDetails!} />
          <AboutCoin cryptoDetails={cryptoDetails!} />
        </Stack>
        <Stack direction="column" width={{ md: "38%", xs: "100%" }} spacing={4}>
          <Stack
            mt={{ md: 7, xs: 2 }}
            borderRadius="20px"
            sx={{ boxShadow: "0 0 20px rgba(0,0,0,0.1)", borderRadius: "12px" }}
          >
            <ConnectBox baseToken={baseToken!} quoteToken={quoteToken!} />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Page;
