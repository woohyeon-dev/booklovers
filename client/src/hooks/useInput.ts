import { useState } from 'react';

const useInput = (initialValue: any, validator?: (arg: string) => boolean) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = event;
    let willUpdate = true;
    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setInputValue({ ...inputValue, [name]: value });
    }
    console.log(value);
  };
  return { props: { inputValue, onChange }, utils: { setInputValue } };
};

export default useInput;
