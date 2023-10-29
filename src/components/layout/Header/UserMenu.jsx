import styles from './style.module.css';
import { Link } from 'react-router-dom';

export default function UserMenu() {
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
        </ul>
      </nav>
    </div>
  );
}
