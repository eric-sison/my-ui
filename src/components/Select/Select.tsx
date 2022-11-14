import { autoUpdate, offset, shift, size, useFloating } from '@floating-ui/react-dom-interactions';
import { Listbox } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { listBtnClass, listOptionsClass } from './Select.styles';
import { ListDef } from './useSelect';

export type RenderList<T> = {
  default: (renderItem: string) => JSX.Element;
  custom: (item: T) => JSX.Element;
};

type SelectProps<T> = {
  data: T[];
  listDef: ListDef<T>;
  initial?: T;
  onSelect?: (item: T) => void;
};

export const Select = <T extends object>({ data, listDef, initial, onSelect }: SelectProps<T>) => {
  const [selected, setSelected] = useState<T>({} as T);

  useEffect(() => (initial ? setSelected(initial) : setSelected(data[0])), [initial]);

  const { key, render, disable } = listDef;

  const { x, y, reference, floating, strategy } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${rects.reference.width}px`,
          });
        },
      }),
      shift({ padding: 5 }),
    ],
  });

  return (
    <Listbox ref={reference} as="div" value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Button as="button" className={listBtnClass()}>
            <>{selected[key]}</>
            <span>
              <ChevronDown rotate={open} />
            </span>
          </Listbox.Button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Listbox.Options
                  static
                  ref={floating}
                  as="div"
                  style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
                  className={listOptionsClass()}
                >
                  <ul className="overflow-y-auto max-h-96">
                    {data.map((listItem: T, index: number) => {
                      /**
                       *  check if disable item function is defined
                       *
                       *  assign the returned value of the function to the disabled prop
                       *
                       *  if disable item function is not supplied, return false by default
                       */
                      const isDisabled = disable ? disable(listItem) : false;

                      return (
                        <Listbox.Option key={index} value={listItem} as={Fragment} disabled={isDisabled}>
                          {(state) => {
                            /**
                             *  set the on select prop to return the value of the selected list item
                             *
                             *  if on select function is not defined, call a function that returns null
                             *
                             *  render the item in the DOM based on user defined element (or just a plain string)
                             */
                            return (
                              <li onClick={onSelect ? () => onSelect(listItem) : () => null}>
                                {render(listItem, state)}
                              </li>
                            );
                          }}
                        </Listbox.Option>
                      );
                    })}
                  </ul>
                </Listbox.Options>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </Listbox>
  );
};

const ChevronDown: FunctionComponent<{ rotate: boolean }> = ({ rotate }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${rotate && 'rotate-180'} w-4 h-4 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
};
