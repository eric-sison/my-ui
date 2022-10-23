import cx from 'classnames';
import { PaginationButtonProps } from './Pagination';

export const btnStyles = ({ rounded, outer }: PaginationButtonProps) => {
  return cx({
    'border py-1 px-2': !outer,
    'border p-1': outer,
    'rounded-l': outer && rounded === 'left',
    'rounded-r': outer && rounded === 'right',
  });
};
