import axios from 'axios';
import React, { useEffect } from 'react';

export default function Redirection() {
  // 인가 코드를 받아서
  const code: string | null = new URL(document.location.toString()).searchParams.get('code');
  console.log(code);

  const postCode = async (code: string | null) => {
    const res = await axios({
      url: 'https://kauth.kakao.com/oauth/token',
      method: 'post',
      params: {
        grant_type: 'authorization_code',
        client_id: '556e2ccdb544d3551ffe0ec46ba303c2',
        redirect_uri: 'http://localhost:5173/kakao/callback',
        code,
      },
    });
    const accessToken: string | null = res.data.access_token;
    console.log(accessToken);
    if (accessToken) {
      // window.location.href = `/login?message=${accessToken}`;

      const res = await axios({
        url: 'https://kapi.kakao.com/v2/user/me',
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: { access_token: accessToken },
      });
      console.log(res.data);
    }
  };
  // postCode(code);

  useEffect(() => {
    postCode(code);
  }, [code]);

  return <div>하이</div>;
}
