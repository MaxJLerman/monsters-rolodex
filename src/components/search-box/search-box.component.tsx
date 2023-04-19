import { ChangeEvent } from 'react';

import './search-box.styles.css';

type SearchBoxProps = {
  className: string;
  placeholder?: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void; // void type means that the function expects no return value
}

const SearchBox = ({ className, placeholder, onChangeHandler }: SearchBoxProps) => (
  <input 
    className={`search-box ${className}`}
    type="search"
    placeholder={placeholder} 
    onChange={onChangeHandler}
  />
);

export default SearchBox;
