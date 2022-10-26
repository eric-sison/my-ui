import React, { FunctionComponent, ReactNode } from 'react';

type BoxContainerProps = {
  children: ReactNode | Array<ReactNode>;
};

export const BoxContainer: FunctionComponent<BoxContainerProps> = ({ children }) => {
  return <div className="w-full h-full">{children}</div>;
};
