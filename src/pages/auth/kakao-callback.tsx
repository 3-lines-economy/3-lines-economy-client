// pages/kakao-callback.tsx
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function KakaoCallback() {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query; // Query에서 Authorization Code를 가져옵니다.

    if (code) {
      sendCodeToServer(code as string);
    }
  }, [router.query]);

  const sendCodeToServer = async (code: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_NEW}auth/sign-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        }
      );
      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error sending code to server:", error);
    }
  };

  return <div>카카오 로그인 중...</div>;
}
