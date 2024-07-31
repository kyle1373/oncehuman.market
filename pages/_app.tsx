import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import activateOnlineLogging from "@hooks/useOnlineLogging";
import TopbarWrapper from "@components/TopBarWrapper";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@redux/store";
import { activatePageCache } from "@hooks/usePageCache";
import { UserProvider } from "@hooks/UserContext";

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

function MyApp({ Component, pageProps }: AppProps) {
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

  activateOnlineLogging();
  activatePageCache();

  return (
    <SessionProvider session={pageProps.session}>
      <UserProvider>
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
      </UserProvider>
    </SessionProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <Provider store={store}>
      <MyApp {...props} />
    </Provider>
  );
}
