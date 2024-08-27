import { useState, useEffect, useCallback } from "react";

// 사용자 정보 타입 정의
interface User {
  id: string;
  name: string;
  email: string;
  // ...
}

// 사용할 수 있는 소셜 로그인 프로바이더 타입 정의
type AuthProvider = "google" | "facebook" | "github" | "kakao" | "naver";

// useAuth 훅에서 반환하는 값들의 타입 정의
interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  loginWithProvider: (provider: AuthProvider) => Promise<void>;
  logout: () => void;
}

const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 소셜 로그인 프로바이더를 통해 로그인하는 함수
  const loginWithProvider = useCallback(async (provider: AuthProvider) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: 실제 로그인 로직 구현
      //   setUser(유저);
    } catch (err) {
      setError("Failed to login with " + provider);
    } finally {
      setLoading(false);
    }
  }, []);

  // 로그아웃 함수
  const logout = useCallback(() => {
    // TODO: 실제 로그아웃 로직 구현
    setUser(null);
  }, []);

  return {
    user,
    loading,
    error,
    loginWithProvider,
    logout,
  };
};

export default useAuth;
