"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTypedSelector } from "@/store";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { OrderBook, OrderBookUpdate } from "@/types";
import LineGraph from "@/components/LineGraph";
import PlaceHolder from "@/components/PlaceHolder";

const Page = () => {
  const router = useRouter();
  const [coinPrice, setCoinPrice] = useState<number[]>([]);
  const [coinTimestamp, setCoinTimestamp] = useState<string[]>([]);

  const baseToken = useTypedSelector((state) => state.token.baseToken);
  const quoteToken = useTypedSelector((state) => state.token.quoteToken);
  const [loading, setLoading] = useState(false);
  const [orderBookdata, setOrderBookData] = useState<OrderBook | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  useEffect(() => {
    if (!baseToken || !quoteToken) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (!baseToken || !quoteToken) return;
      setError(null);
      setLoading(true);
      try {
        const data = await axios.get(
          `https://api.0x.org/orderbook/v1?quoteToken=${quoteToken.token}&baseToken=${baseToken.token}`
        );
        setLoading(false);
        setOrderBookData(data.data);
        // console.log("axios data", data.data);
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [baseToken, quoteToken]);

  const socket = new WebSocket("wss://api.0x.org/orderbook/v1");
  useEffect(() => {
    const msg = {
      type: "subscribe",
      channel: "orders",
      makerToken: quoteToken?.token,
      takerToken: baseToken?.token,
      requestId: "123e4567-e89b-12d3-a456-426655440000",
    };

    socket.onopen = () => {
      console.log("Web socket client connected");
      socket.send(JSON.stringify(msg));
    };

    socket.onmessage = ({ data }) => {
      const res = JSON.parse(data) as OrderBookUpdate;
      for (const key of res.payload) {
        // This expiry not createdAt which means time is futuristic and therefore it won't be accurate
        const dt = +key.order.expiry * 1000;
        setCoinTimestamp((prev) => [
          ...prev,
          new Date(dt).toLocaleDateString(),
        ]);
        setCoinPrice((prev) => [...prev, +key.order.takerAmount]);
      }
    };

    return () => {
      if (socket.readyState !== WebSocket.CLOSED) {
        socket.close();
      }
    };
  }, []);

  if ((!orderBookdata || loading) && !error) {
    return <PlaceHolder status="loading" orderBook={true} />;
  }

  if (error) {
    return <PlaceHolder status="error" />;
  }

  for (const d of orderBookdata!.bids.records) {
    coinPrice.push(+d.order.takerAmount);
    coinTimestamp.push(new Date(d.metaData.createdAt!).toLocaleDateString());
  }

  for (const d of orderBookdata!.asks.records) {
    coinPrice.push(+d.order.takerAmount);
    coinTimestamp.push(new Date(d.metaData.createdAt!).toLocaleDateString());
  }

  const lineData = {
    labels: coinTimestamp,
    datasets: [
      {
        label: `${quoteToken?.code} price In ${baseToken?.code}`,
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
        mt={4}
        direction="column"
      >
        <LineGraph data={lineData} setTimeperiod={() => {}} />
      </Stack>
    </Container>
  );
};

export default Page;
