import "../styles/globals.css";
import "../styles/nprogress.css";
import NProgress from "nprogress";
import { Router } from "next/router";

NProgress.configure({ minimum: 0.2 });

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
