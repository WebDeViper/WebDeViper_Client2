import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import UserMenu from './UserMenu';
import { useState } from 'react';

export default function Header() {
  const [isShow, setIsShow] = useState(false);

  const handleOnClick = () => {
    setIsShow(prev => !prev);
  };
  return (
    <header className="flex justify-between pt-7 pb-5 relative z-50">
      <nav>
        <ul className="flex items-center gap-6">
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
          <span className="font-bold">김땡땡</span>
        </li>
        <li className="relative">
          <button onClick={handleOnClick} className="flex items-center">
            <span className="cursor-pointer text-[#A3A3A3] text-2xl">
              <FiUser />
            </span>
          </button>
        </li>
      </ul>
      {isShow && <UserMenu />}
    </header>
  );
}
