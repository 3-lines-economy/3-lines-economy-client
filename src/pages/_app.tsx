import Header from "@/components/Header/Header";
import type { AppProps } from "next/app";
import RecoilRootWrapper from "./RecoilWrapper";
import Script from "next/script";
import { useSetRecoilState } from "recoil";
import { authState } from "@/atoms/authState";
import { useEffect } from "react";

function InitializeAuthState() {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      setAuth({ accessToken, refreshToken });
    }
  }, [setAuth]);

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRootWrapper>
      <InitializeAuthState />
      <Header />
      <Script
        strategy="beforeInteractive"
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=mhvjuj53xv"
      />
      <script src="https://developers.kakao.com/sdk/js/kakao.js" defer></script>
      <Component {...pageProps} />
    </RecoilRootWrapper>
  );
}

export default MyApp;
