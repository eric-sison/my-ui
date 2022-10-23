import React, { HTMLAttributes, ReactNode } from 'react';
import { styles } from './Wrapper.styles';

export type WrapperProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const Wrapper = React.forwardRef<HTMLDivElement, WrapperProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <div {...rest} ref={ref} className={styles()}>
      {children}
    </div>
  );
});
