import { FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Dropdown } from 'flowbite-react';
import { logout } from '../../../reducers/userSlice';
import styles from './style.module.css';

export default function Header() {
  const nickName = useSelector(state => state.user?.userInfo.nickName);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="flex justify-between pt-7 pb-5 relative z-50">
      <nav>
        <ul className="flex items-center gap-6 font-semibold">
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/notice">공지사항</Link>
          </li>
          <li>
            <Link to="/ranking">랭킹</Link>
          </li>
          <li>
            <Link to="/setting">설정</Link>
          </li>
        </ul>
      </nav>
      <ul className="flex items-center gap-8">
        <li>
          <span className="">
            <b>{nickName}</b> 님
          </span>
        </li>
        <li className="relative">
          <Dropdown
            theme={customTheme}
            inline
            renderTrigger={() => (
              <span className="cursor-pointer text-[#A3A3A3] text-2xl">
                <FiUser />
              </span>
            )}
          >
            <Dropdown.Item as={Link} to="myPage" className="text-black text-sm hover:!bg-transparent">
              마이페이지
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="calendar" className="text-black text-sm hover:!bg-transparent">
              TODO 캘린더
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout} className="text-black text-sm hover:!bg-transparent">
              로그아웃
            </Dropdown.Item>
          </Dropdown>
        </li>
      </ul>
    </header>
  );
}

const customTheme = {
  floating: {
    base: `!bg-semi_primary absolute !right-0 top-full mt-[20px] !left-auto !top-full rounded-b-lg rounded-tl-lg !transform-none focus-visible:outline-none border-none w-max ${styles.panel}`,
  },
};
