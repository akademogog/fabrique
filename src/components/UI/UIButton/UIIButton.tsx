import React, { ButtonHTMLAttributes } from "react";
import style from './UIButton.module.scss';

interface UIIButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'green' | 'red' | 'default'
}

export const UIIButton: React.FC<UIIButtonProps> = ({ variant, ...rest }) => {
  return <button className={`${style.button} ${style[variant]}`} {...rest}></button>;
};
