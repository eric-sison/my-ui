import cls from 'classnames';
import { ListState } from './SelectItem';

export const listBtnClass = () => {
  return cls(
    'px-3 py-2 w-full text-left bg-white flex items-center justify-between text-base border rounded focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100'
  );
};

export const listOptionsClass = () => {
  return cls(
    'py-2 max-h-80 w-full bg-white border rounded-lg shadow-lg shadow-slate-200 focus:outline-none overflow-clip overflow-y-auto'
  );
};

export const listItemClass = (state: ListState | undefined) => {
  return cls('px-5 py-2 transition-colors', {
    // if item list is disabled
    'text-gray-400 cursor-default': state?.disabled,
    'cursor-pointer': !state?.disabled,

    // if item list is active
    'bg-slate-100': state?.active,

    'bg-indigo-500 text-white font-medium': state?.selected,
  });
};
