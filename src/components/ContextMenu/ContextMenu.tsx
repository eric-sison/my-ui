import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, FunctionComponent, ReactNode, useState } from 'react';
import { usePopper } from 'react-popper';
import { popperStyles } from './ContextMenu.styles';

type Props = {
  children: ReactNode | Array<ReactNode>;
};

type MenuItem = {
  content: JSX.Element;
};

type ContextMenuProps = Props & {
  display: () => JSX.Element | string;
  placement?:
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';
};

type ContextMenuComposition = {
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
};

type ContentProps = {
  items: Array<MenuItem>;
};

const offsetModifier = {
  name: 'offset',
  options: {
    offset: [0, 10],
  },
};

export const ContextMenu: FunctionComponent<ContextMenuProps> & ContextMenuComposition = ({
  display,
  children,
  placement,
}) => {
  // initialize reference element to compose a popper
  const [reference, setReference] = useState<HTMLDivElement | null>(null);

  // initialize the popper element
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);

  // create a popper
  const { styles, attributes } = usePopper(reference, popper, { placement, modifiers: [offsetModifier] });

  return (
    <Menu as="div">
      <Menu.Button as="div" ref={setReference}>
        {display()}
      </Menu.Button>

      <Transition
        as={Fragment}
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items as="div" style={styles.popper} {...attributes.popper} ref={setPopper} className={popperStyles()}>
          <Menu.Item as="div">{children}</Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const Header: FunctionComponent<Props> = ({ children }) => {
  return <header className="px-3 py-2 border-b border-gray-100">{children}</header>;
};

const Content: FunctionComponent<ContentProps> = ({ items }) => {
  return (
    <ul className="max-h-80 max-w-md overflow-y-auto">
      {items.map((item: MenuItem, index: number) => {
        return (
          <li key={index} className="hover:bg-slate-100 pl-3 pr-8 py-3 cursor-pointer">
            {item.content}
          </li>
        );
      })}
    </ul>
  );
};

const Footer: FunctionComponent<Props> = ({ children }) => {
  return <footer className="px-3 py-2 border-t border-gray-100">{children}</footer>;
};

ContextMenu.Header = Header;

ContextMenu.Content = Content;

ContextMenu.Footer = Footer;

ContextMenu.defaultProps = {
  placement: 'bottom-end',
};
