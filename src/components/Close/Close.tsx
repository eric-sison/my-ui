import React, { ButtonHTMLAttributes } from 'react';
import { closeBtnStyles, closeSvgStyles } from './Close.styles';

export type CloseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md' | 'lg';
};

export const Close = React.forwardRef<HTMLButtonElement, CloseProps>((props, ref) => {
  const { size, ...rest } = props;

  return (
    <button {...rest} ref={ref} className={closeBtnStyles()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className={closeSvgStyles(props)}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
});

Close.defaultProps = {
  size: 'md'
};
