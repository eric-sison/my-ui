import { Listbox } from '@headlessui/react';
import React, { Fragment, FunctionComponent, useState } from 'react';
import { usePopper } from 'react-popper';
import { selectBtnStyles, selectFooterStyles, selectItemStyles, selectOptionsStyles } from './Select.styles';

/**
 *  this will help in defining the list
 */
export type ListDef<T> = {
  displayItem: keyof T;
  item: (arg: T, isActive?: boolean, isSelected?: boolean) => JSX.Element | string;
};

/**
 *  set prop type of this component
 */
type SelectProps<T> = {
  data: Array<T>;
  list: ListDef<T>;
  withDivider?: boolean;
  footNote?: JSX.Element | string;
  onSelect?: (selectedItem: T) => void;
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

export const Select = <T extends object>({ data, list, withDivider, footNote, onSelect }: SelectProps<T>) => {
  // deconstruct fields from listDef object
  const { displayItem, item } = list;

  // set initial selection
  const [selected, setSelected] = useState(data[0][displayItem]);

  // set reference element for popper
  const [reference, setReference] = useState<HTMLButtonElement | null>(null);

  // set popper element
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);

  // create a popper
  const { styles, attributes } = usePopper(reference, popper, { placement: 'bottom', modifiers: [offsetModifier] });

  return (
    <Listbox value={selected} onChange={setSelected} as="div">
      <Listbox.Button as="button" ref={setReference} className={selectBtnStyles()}>
        <>{selected}</>
        <SelectIcon />
      </Listbox.Button>
      <Listbox.Options
        as="div"
        {...attributes.popper}
        ref={setPopper}
        style={{ ...styles.popper, width: `${reference?.offsetWidth}px` }}
        className={selectOptionsStyles()}
      >
        <ul className="max-h-60 overflow-auto">
          {data.map((optionData: T, index: number) => {
            return (
              <Listbox.Option value={optionData[displayItem]} key={index} as={Fragment}>
                {({ active, selected }) => {
                  return (
                    <li
                      onClick={onSelect ? () => onSelect(optionData) : () => null}
                      className={selectItemStyles(withDivider, active, selected)}
                    >
                      {item(optionData, active, selected)}
                    </li>
                  );
                }}
              </Listbox.Option>
            );
          })}
        </ul>

        <footer className={selectFooterStyles()}>
          {footNote ? <span>{footNote}</span> : <span className="py-2" />}
        </footer>
      </Listbox.Options>
    </Listbox>
  );
};

// custom select icon
const SelectIcon: FunctionComponent = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
    </svg>
  );
};
