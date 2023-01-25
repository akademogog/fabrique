import React, { ButtonHTMLAttributes, ReactNode } from "react";
import style from './UIButton.module.scss';
import PlusIcon from '@/assets/img/icon-plus.svg'

interface UIIButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'green' | 'red' | 'plus' | 'default',
    children?: ReactNode
}

export const UIIButton: React.FC<UIIButtonProps> = ({ variant, children, ...rest }) => {
  return <button className={`${style.button} ${style[variant]}`} {...rest}>{variant === 'plus' && <img src={PlusIcon}/>} {children}</button>;
};
