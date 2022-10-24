import { Menu, Portal } from '@headlessui/react';
import React, { FunctionComponent, ReactNode, useState } from 'react';
import { usePopper } from 'react-popper';
import { itemStyles, popperStyles } from './ContextMenu.styles';

type MenuItem = {
  icon?: JSX.Element;
  description: string;
  action?: () => void;
};

type ContextMenuProps = {
  children: ReactNode | Array<ReactNode>;
  items: Array<MenuItem>;
  placement?:
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';
};

const offsetModifier = {
  name: 'offset',
  options: {
    offset: [0, 10],
  },
};

export const ContextMenu: FunctionComponent<ContextMenuProps> = ({ children, items, placement }) => {
  // initialize reference element to compose a popper
  const [reference, setReference] = useState<HTMLDivElement | null>(null);

  // initialize the popper element
  const [popper, setPopper] = useState<HTMLUListElement | null>(null);

  // create a popper
  const { styles, attributes } = usePopper(reference, popper, { placement, modifiers: [offsetModifier] });

  return (
    <Menu as="div">
      <Menu.Button as="div" ref={setReference}>
        {children}
      </Menu.Button>

      <Portal>
        <Menu.Items {...attributes.popper} as="ul" ref={setPopper} style={styles.popper} className={popperStyles()}>
          {items.map((item: MenuItem, index: number) => {
            return (
              <Menu.Item key={index} as="li">
                {({ active }) => {
                  return (
                    <span onClick={item.action} className={itemStyles(active)}>
                      {item.icon} {item.description}
                    </span>
                  );
                }}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Portal>
    </Menu>
  );
};
