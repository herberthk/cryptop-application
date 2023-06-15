"use client";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import React, { FC } from "react";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";

// export const metadata = {
//   title: "Risk protocol",
//   description: "The risk controlled crypto investment",
// };

interface Props {
  children: React.ReactNode;
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <title>Risk protocol</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="The risk controlled crypto investment"
      />
      <body>
        <Provider store={store}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Header />
          <ThemeRegistry>{children}</ThemeRegistry>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
