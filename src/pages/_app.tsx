import Header from "@/components/Header/Header";
import type { AppProps } from "next/app";
import RecoilRootWrapper from "./RecoilWrapper";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRootWrapper>
      <Header />
      <Script
        strategy="beforeInteractive"
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=mhvjuj53xv"
      />
      {/* 카카오 로그인 위해 추가 */}
      <script src="https://developers.kakao.com/sdk/js/kakao.js" defer></script>
      <Component {...pageProps} />
    </RecoilRootWrapper>
  );
}

export default MyApp;
