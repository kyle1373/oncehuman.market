import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import useOnlineLogging from "@hooks/useOnlineLogging";
import TopbarWrapper from "@components/TopBarWrapper";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";

NProgress.configure({ showSpinner: false });

const handleRouteChangeStart = () => {
  NProgress.start();
};

const handleRouteChangeComplete = () => {
  NProgress.done();
};

const handleRouteChangeError = () => {
  NProgress.done();
};

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, []);
  
  useOnlineLogging(); // Call online logging here

  return (
    <SessionProvider session={pageProps.session}>
      {process.env.NODE_ENV === "production" && (
        <Script
          async
          src="https://stats.superfx.dev/script.js"
          data-website-id="8f001ca2-6c2b-4c17-8824-19d8776952c7"
        />
      )}
      <TopbarWrapper>
        <Component {...pageProps} />
      </TopbarWrapper>
    </SessionProvider>
  );
}
