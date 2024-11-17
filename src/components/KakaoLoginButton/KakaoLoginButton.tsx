import React from "react";
import { useRouter } from "next/router";
import KaKaoLoginSvg from "@public/kakao-login.svg";

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY;
const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

const KakaoLoginButton: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    router.push(kakaoAuthUrl);
  };

  return (
    <div onClick={handleLogin}>
      <KaKaoLoginSvg />
    </div>
  );
};

export default KakaoLoginButton;
