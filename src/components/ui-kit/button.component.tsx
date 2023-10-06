import { ButtonHTMLAttributes } from 'react';
import css from 'styled-jsx/macro';

type ButtonProps = {
  isLoading: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ isLoading, children }: ButtonProps) => {
  const { className, styles } = css.resolve`
    button {
      border: 1px solid black;
      padding: 0 2rem;
      min-width: 8rem;
      height: 3rem;
      color: ${isLoading ? '#888888' : 'white'};
      background-color: ${isLoading ? '#CCCCCC' : 'black'};
    }
    button:hover {
      background-color: ${isLoading ? '#CCCCCC' : 'white'};
      color: ${isLoading ? '#888888' : 'black'};
      border: 1px solid black;
    }
  `;
  return (
    <button disabled={isLoading} className={className}>
      {children}
      {styles}
    </button>
  );
};

export default Button;
