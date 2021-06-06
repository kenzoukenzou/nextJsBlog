import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/global.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
// import "instantsearch.css/themes/reset.css";
import "tailwindcss/tailwind.css";
import Navbar from "../components/navBar";

const App = ({ Component, pageProps }: AppProps) => {
  if (process.env.NODE_ENV === "production") {
    const router = useRouter();
    useEffect(() => {
      const handleRouteChange = (url: URL) => {
        gtag.pageView(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }, [router.events]);
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 pt-3 pb-12">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default App;
