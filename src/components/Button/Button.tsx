import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode | Array<ReactNode>;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <button ref={ref} className="p-5 bg-indigo-600 text-white">
      {props.children}
    </button>
  );
});
