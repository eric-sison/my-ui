import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { styles } from './Button.styles';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'warning' | 'danger' | 'white';
  size?: 'sm' | 'md' | 'lg';
  shadow?: boolean;
  full?: boolean;
  capitalize?: boolean;
  disable?: boolean;
  animate?: boolean;
  children: ReactNode;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  // desconstruct fields to separate custom props and built in props
  const { disable, animate, children, variant, size, shadow, full, capitalize, ...rest } = props;

  return (
    <button disabled={disable} {...rest} ref={ref} className={styles(props)}>
      {children}
    </button>
  );
});

Button.defaultProps = {
  variant: 'primary',
  size: 'sm',
  shadow: false,
  full: false,
  capitalize: false,
  disable: false,
  animate: true,
};
