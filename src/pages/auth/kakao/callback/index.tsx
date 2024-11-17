// import React, { useEffect } from "react";
// import { useRouter } from "next/router";

// const KakaoCallback: React.FC = () => {
//   const router = useRouter();
//   const { code } = router.query;

//   useEffect(() => {
//     if (code) {
//       const fetchToken = async () => {
//         try {
//           const tokenResponse = await fetch("/api/auth/kakao", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ code }),
//           });

//           if (tokenResponse.ok) {
//             const { token: accessToken } = await tokenResponse.json();

//             const loginResponse = await fetch(
//               `${process.env.NEXT_PUBLIC_API}/auth/sign-in`,
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${accessToken}`,
//                 },
//               }
//             );

//             if (loginResponse.ok) {
//               const data = await loginResponse.json();
//               console.log("로그인 성공:", data);
//               router.push("/main"); // 로그인 성공 시 메인 페이지로 이동
//             } else {
//               console.error("로그인 실패:", loginResponse.statusText);
//             }
//           } else {
//             console.error("카카오 인증 실패:", tokenResponse.statusText);
//           }
//         } catch (error) {
//           console.error("로그인 요청 중 에러 발생:", error);
//         }
//       };

//       fetchToken();
//     }
//   }, [code, router]);

//   return <div>카카오 로그인 중...</div>;
// };

// export default KakaoCallback;

import React, { useEffect } from "react";
import { useRouter } from "next/router";

const KakaoCallback: React.FC = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      const handleLogin = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API}auth/sign-in`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log("로그인 성공:", data);
            router.push("/main");
          } else {
            console.error("로그인 실패:", response.statusText);
          }
        } catch (error) {
          console.error("로그인 요청 중 에러 발생:", error);
        }
      };

      handleLogin();
    }
  }, [code, router]);

  return <div>카카오 로그인 중...</div>;
};

export default KakaoCallback;
