import React, { InputHTMLAttributes } from "react";
import style from './UIInput.module.scss';

interface UIInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isDisabled?: boolean
}
export const UIInput: React.FC<UIInputProps> = ({
  label,
  onInput,
  isDisabled,
  ...rest
}) => {
  return (
    <span className={`${style.input} ${isDisabled? style.inputDisabled : ''}`}>
      {label && <label className={style.inputLabel}>{label}</label>}
      <input className={style.inputField} type="text" {...rest} />
    </span>
  );
};
