import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import useOnlineLogging from "@hooks/useOnlineLogging";

export default function App({ Component, pageProps }) {

  useOnlineLogging(); // Call the custom hook here

  return (
    <SessionProvider session={pageProps.session}>
      {process.env.NODE_ENV === "production" && (
        <>
          <Script
            async
            src="https://stats.superfx.dev/script.js"
            data-website-id="8f001ca2-6c2b-4c17-8824-19d8776952c7"
          />
        </>
      )}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
