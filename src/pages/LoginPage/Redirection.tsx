import axios from 'axios';
import React, { useEffect } from 'react';

export default function Redirection() {
  // 인가 코드를 받아서
  const code: string | null = new URL(document.location.toString()).searchParams.get('code');
  console.log(code);

  const postCode2 = async (code: string | null) => {
    const GOOGLE_REST_API_KEY: string = import.meta.env.VITE_GOOGLE_REST_API_KEY;
    const REDIRECT_URI: string = import.meta.env.VITE_REDIRECT_URI;

    const res = await axios({
      url: 'https://oauth2.googleapis.com/token',
      method: 'post',
      params: {
        grant_type: 'authorization_code',
        client_id: GOOGLE_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      },
    });
    const accessToken: string | null = res.data.access_token;
    console.log(accessToken);
    if (accessToken) {
      // window.location.href = `/login?message=${accessToken}`;

      const res = await axios({
        url: ' https://www.googleapis.com/userinfo/v2/me ',
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: { access_token: accessToken },
      });
      console.log(res.data);
    }
  };
  // const postCode = async (code: string | null) => {
  //   const KAKAO_REST_API_KEY: string = import.meta.env.VITE_KAKAO_REST_API_KEY;

  //   const res = await axios({
  //     url: 'https://kauth.kakao.com/oauth/token',
  //     method: 'post',
  //     params: {
  //       grant_type: 'authorization_code',
  //       client_id: KAKAO_REST_API_KEY,
  //       redirect_uri: 'http://localhost:5173/kakao/callback',
  //       code,
  //     },
  //   });
  //   const accessToken: string | null = res.data.access_token;
  //   console.log(accessToken);
  //   if (accessToken) {
  //     // window.location.href = `/login?message=${accessToken}`;

  //     const res = await axios({
  //       url: 'https://kapi.kakao.com/v2/user/me',
  //       method: 'post',
  //       headers: {
  //         'content-type': 'application/x-www-form-urlencoded',
  //       },
  //       data: { access_token: accessToken },
  //     });
  //     console.log(res.data);
  //   }
  // };

  // postCode(code);

  useEffect(() => {
    postCode2(code);
  }, [code]);

  return <div>하이</div>;
}
