import styles from './style.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../reducers/userSlice';

export default function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <div className={`p-5 bg-semi_primary absolute right-0 top-full mt-[13px] ${styles.panel}`}>
      <nav>
        <ul className="flex flex-col leading-[22px] gap-[15px]">
          <li>
            <Link to="myPage">마이페이지</Link>
          </li>
          <li>
            <Link to="calendar">TODO 캘린더</Link>
          </li>
          <li style={{ cursor: 'pointer' }} onClick={handleLogout}>
            로그아웃
          </li>
        </ul>
      </nav>
    </div>
  );
}
