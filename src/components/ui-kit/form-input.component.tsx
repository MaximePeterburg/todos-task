import { InputHTMLAttributes } from 'react';
import css from 'styled-jsx/macro';

type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({ label, ...otherProps }: FormInputProps) => {
  const { className, styles } = css.resolve`
    div {
      width: 100%;
    }
    label {
      font-weight: 600;
    }
    input {
      width: 100%;
      padding: 0.75rem 0.75rem 0.75rem 0.325rem;
    }
    input:focus {
      border-color: #ffa500;
      outline: none;
    }
  `;
  return (
    <div className={className}>
      <label className={className}>{label}</label>
      <input {...otherProps} className={className} />
      {styles}
    </div>
  );
};

export default FormInput;
