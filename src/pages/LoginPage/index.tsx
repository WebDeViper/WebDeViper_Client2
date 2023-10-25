// LoginPage / index.tsx
interface Style {
  backgroundColor: string;
}

export default function LoginPage() {
  // 카카오 설정에서 redirect uri 를 백쪽으로 설정해야함
  const REST_API_KEY = '556e2ccdb544d3551ffe0ec46ba303c2';
  const REDIRECT_URI = 'http://localhost:5173/kakao/callback';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  const style: Style = {
    backgroundColor: 'red',
  };

  return (
    <div>
      <h1>LoginPage</h1>
      <button onClick={loginHandler} style={style}>
        카카오 로그인
      </button>
      <button>구글 로그인</button>
      <button>네이버 로그인</button>
    </div>
  );
}
