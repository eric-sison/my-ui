import React from 'react';
import { ListState, SelectItem } from './SelectItem';

export type ListDef<T> = {
  key: keyof T;
  render: (item: T, state: ListState) => JSX.Element;
  disable?: (item: T) => boolean;
};

export const listRenderer = {
  // render the default select list item component
  default: (displayItem: string, state: ListState) => <SelectItem displayItem={displayItem} state={state} />,

  // render a custom select list item component
  custom: (itemComponent: JSX.Element) => itemComponent,
};

export const useSelect = <T,>(listDef: ListDef<T>) => {
  return { listDef };
};
