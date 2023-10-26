import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useEffect } from 'react';

export default function MainPage(): React.ReactElement {
  const isAuthorized: boolean = false;
  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
  }, []);

  // useNavigate 통해 버튼 클릭 시 로그인 페이지로 이동
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div>
      <Button handleClick={handleClick}>로그인</Button>
    </div>
  );
}
