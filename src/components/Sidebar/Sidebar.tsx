import React, { createContext, useContext } from 'react';
import { FunctionComponent, ReactNode } from 'react';
import { asideStyles } from './Sidebar.styles';

type SidebarContextState = Omit<SidebarProps, 'children'>;

type Props = {
  children: ReactNode | Array<ReactNode>;
};

type SidebarProps = Props & {
  open?: boolean;
};

type SidebarComposition = {
  Aside: typeof Aside;
  Main: typeof Main;
};

export const SidebarContext = createContext({ open: true } as SidebarContextState);

// create a custom hook to expose sidebar context
export const useSidebar = (): boolean | undefined => {
  // deconstruct value from this context
  const { open } = useContext(SidebarContext);

  // return the value
  return open;
};

export const Sidebar: FunctionComponent<SidebarProps> & SidebarComposition = ({ open, children }) => {
  return (
    <div className="flex overflow-x-hidden h-full">
      <SidebarContext.Provider value={{ open }}>{children}</SidebarContext.Provider>
    </div>
  );
};

const Aside: FunctionComponent<Props> = ({ children }) => {
  const { open } = useContext(SidebarContext);
  return (
    <aside className={asideStyles(open)}>
      <nav className="flex flex-col h-full">{children}</nav>
    </aside>
  );
};

const Main: FunctionComponent<Props> = ({ children }) => {
  return <main className="w-full h-full overflow-y-auto">{children}</main>;
};

Sidebar.Aside = Aside;
Sidebar.Main = Main;

Sidebar.defaultProps = {
  open: true,
};
