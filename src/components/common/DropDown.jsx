import { Dropdown } from 'flowbite-react';
import { useRef } from 'react';

export default function DropDown({ title, items, styles, handleClick, itemStyle, placement }) {
  const itemRef = useRef();
  return (
    <div className={`${styles} flex items-center gap-1`}>
      <Dropdown label={title} placement={placement} inline>
        {items.map((item, index) => (
          <Dropdown.Item key={index} className={itemStyle} onClick={() => handleClick(item)}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
}
