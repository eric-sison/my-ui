import { Listbox } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { usePopper } from 'react-popper';
import { selectBtnStyles, selectItemStyles, selectOptionsStyles, selectSvgStyles } from './Select.styles';

/**
 *  define the different states of a list item
 */
export type ListState = {
  active: boolean;
  selected: boolean;
  disabled: boolean;
};

/**
 *  this will help in defining the list
 */
export type ListDef<T> = {
  display: keyof T;
  item: (listItem: T, listState: ListState) => JSX.Element | string;
};

/**
 *  set prop type of this component
 */
type SelectProps<T> = {
  data: Array<T>;
  list: ListDef<T>;
  onSelect?: (selectedItem: T) => void;
  withDivider?: boolean;
  full?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  getReferenceWidth?: boolean;
  centerItems?: boolean;
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

/**
 *  define offset modifier for popper js
 */
const offsetModifier = {
  name: 'offset',
  options: {
    offset: [0, 10],
  },
};

export const Select = <T extends object>({
  data,
  list,
  withDivider,
  full,
  size,
  placement,
  getReferenceWidth,
  centerItems,
  onSelect,
}: SelectProps<T>) => {
  // deconstruct fields from listDef object
  const { display, item } = list;

  // set initial selection
  const [selected, setSelected] = useState(data[0]);

  // set reference element for popper
  const [reference, setReference] = useState<HTMLButtonElement | null>(null);

  // set popper element
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);

  // create a popper
  const { styles, attributes } = usePopper(reference, popper, { placement, modifiers: [offsetModifier] });

  return (
    <Listbox value={selected} onChange={setSelected} as="div">
      <Listbox.Button as="button" ref={setReference} className={selectBtnStyles(full, size)}>
        <>{selected[display]}</>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={selectSvgStyles(size)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      </Listbox.Button>

      <Listbox.Options
        as="div"
        {...attributes.popper}
        ref={setPopper}
        style={
          getReferenceWidth
            ? { ...styles.popper, width: `${reference?.offsetWidth}px` }
            : { ...styles.popper, maxWidth: '28rem' }
        }
        className={selectOptionsStyles()}
      >
        {/** unordered list starts here */}
        <ul className="max-h-60 overflow-auto">
          {data.map((listItem: T, index: number) => {
            return (
              <Listbox.Option value={listItem} key={index} as={Fragment}>
                {(state) => {
                  return (
                    <li
                      onClick={onSelect ? () => onSelect(listItem) : () => null}
                      className={selectItemStyles(state, centerItems, withDivider, getReferenceWidth, size)}
                    >
                      {item(listItem, state)}
                    </li>
                  );
                }}
              </Listbox.Option>
            );
          })}
        </ul>
      </Listbox.Options>
    </Listbox>
  );
};

Select.defaultProps = {
  withDivider: false,
  full: false,
  size: 'md',
  placement: 'bottom',
  getReferenceWidth: true,
  centerItems: false,
};
