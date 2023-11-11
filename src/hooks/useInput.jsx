import { useCallback, useState } from 'react';

export default function useInput() {
  const [value, setValue] = useState('');
  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);
  return [value, onChange];
}
