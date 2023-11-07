import { Dropdown } from 'flowbite-react';
import { useRef } from 'react';
import './DropDown.css';

export default function DropDown({ title, items, styles, handleClick, itemStyle, placement }) {
  const itemRef = useRef();
  return (
    <div className={`${styles}`}>
      <Dropdown className="border flex justify-center text-center" label={title} placement={placement} inline>
        <div className="dropdown-scroll-container">
          {items.map((item, index) => (
            <Dropdown.Item key={index} className={itemStyle} onClick={() => handleClick(item)}>
              {item}
            </Dropdown.Item>
          ))}
        </div>
      </Dropdown>
    </div>
  );
}
