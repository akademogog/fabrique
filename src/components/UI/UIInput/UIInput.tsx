import React, { ChangeEventHandler, InputHTMLAttributes } from "react";
import style from './UIInput.module.scss';

interface UIInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const UIInput: React.FC<UIInputProps> = ({
  label,
  onInput,
  ...rest
}) => {
  return (
    <span className={style.input}>
      {label && <label className={style.inputLabel}>{label}</label>}
      <input className={style.inputField} type="text" {...rest} />
    </span>
  );
};
