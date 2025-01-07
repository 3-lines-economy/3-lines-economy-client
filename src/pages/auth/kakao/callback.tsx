import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "@/atoms/authState";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useFetch } from "@/hooks/useFetch";

export default function KakaoCallback() {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const [, setLocalAccessToken] = useLocalStorage<string>("accessToken", "");
  const [, setLocalRefreshToken] = useLocalStorage<string>("refreshToken", "");
  const { request, loading, error } = useFetch();

  useEffect(() => {
    const { code } = router.query;

    if (code) {
      sendCodeToServer(code as string);
    }
  }, [router.query]);

  const sendCodeToServer = async (code: string) => {
    try {
      const response = await request("auth/sign-in", null, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (response?.body) {
        setAuth({
          accessToken: response.body.accessToken,
          refreshToken: response.body.refreshToken,
        });

        setLocalAccessToken(response.body.accessToken);
        setLocalRefreshToken(response.body.refreshToken);

        router.push("/");
      } else {
        console.error("Invalid server response:", response);
      }
    } catch (error) {
      console.error("Error sending code to server:", error);
    }
  };

  return (
    <div>
      {loading ? "카카오 로그인 중..." : "카카오 로그인 완료"}
      {error && <p style={{ color: "red" }}>로그인 중 오류 발생: {error}</p>}
    </div>
  );
}
