import { FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Dropdown } from 'flowbite-react';
import { logout } from '../../../reducers/userSlice';
import styles from './style.module.css';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Header() {
  const nickName = useSelector(state => state.user?.userInfo.nickName);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isSideOpen, setIsSideOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSideOpen = () => {
    setIsSideOpen(true);
  };

  const handleSideClose = () => {
    setIsSideOpen(false);
  };

  return (
    <header className="flex justify-between pt-7 pb-5 relative z-50">
      {isSideOpen && (
        <div className={`sidebar fixed top-0 left-0 h-screen w-1/2 bg-slate-300`}>
          <button className="absolute top-5 right-5" onClick={handleSideClose}>
            <GrClose className="text-2xl opacity-30" />
          </button>
          <ul className="flex items-center gap-6 font-semibold flex-col mt-20">
            <li>
              <Link to="/" onClick={() => setIsSideOpen(false)}>
                홈
              </Link>
            </li>
            <li>
              <Link to="/notice" onClick={() => setIsSideOpen(false)}>
                공지사항
              </Link>
            </li>
            <li>
              <Link to="/ranking" onClick={() => setIsSideOpen(false)}>
                랭킹
              </Link>
            </li>
            <li>
              <Link to="/setting" onClick={() => setIsSideOpen(false)}>
                설정
              </Link>
            </li>
          </ul>
        </div>
      )}
      {isMobile ? (
        <button onClick={handleSideOpen}>
          <GiHamburgerMenu className="text-2xl" />
        </button>
      ) : (
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
      )}

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
            <Dropdown.Item as={Link} to="timer" className="text-black text-sm hover:!bg-transparent">
              공부하러 가기
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

const burgerStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '30px',
    height: '20px',
    left: '20px',
    top: '28px',
  },
  bmBurgerBars: {
    background: '#373a47',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    zIndex: '99', // Adjust the z-index to make sure it's above the header
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};
