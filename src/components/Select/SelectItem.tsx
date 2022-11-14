import React, { FunctionComponent } from 'react';
import { listItemClass } from './Select.styles';

export type ListState = {
  active: boolean;
  selected: boolean;
  disabled: boolean;
};

type SelectItemProps = {
  displayItem: string;
  state: ListState;
};

export const SelectItem: FunctionComponent<SelectItemProps> = ({ displayItem, state }) => {
  return <div className={listItemClass(state)}>{displayItem}</div>;
};
