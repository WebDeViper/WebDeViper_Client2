import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../reducers/thunkFunctions';
import { redirectUrl } from '../../utils/redirectUrl';

export default function KakaoPage() {
  const navigate = useNavigate();
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

  const REDIRECT_URI = redirectUrl('kakao');
  const dispatch = useDispatch();

  const getToken = useCallback(
    async code => {
      try {
        const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
          params: {
            grant_type: 'authorization_code',
            client_id: KAKAO_REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code,
          },
        });

        const { access_token } = response.data;
        let profile = await getFirebaseCustomToken(access_token);
        profile.provider = 'kakao';

        // 리덕스에서 로그인 로직 처리 후 리덕스로 상태관리
        dispatch(loginUser(profile));
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    },
    [KAKAO_REST_API_KEY, REDIRECT_URI, navigate, dispatch]
  );

  const getFirebaseCustomToken = async access_token => {
    try {
      const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const profile = response.data;
      return profile;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      getToken(code);
    }
  }, [getToken]);

  return <div>Kakao 로그인 중...</div>;
}
