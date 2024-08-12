import Header from "@/components/Header/Header";
// import "../styles/globals.css";
import type { AppProps } from "next/app";
import RecoilRootWrapper from "./RecoilWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRootWrapper>
      <Header />
      <Component {...pageProps} />
    </RecoilRootWrapper>
  );
}

export default MyApp;
