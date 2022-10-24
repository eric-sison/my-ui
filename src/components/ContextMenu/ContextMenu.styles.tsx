import cx from 'classnames';

export const popperStyles = () => {
  return cx(
    'absolute z-20 overflow-clip rounded bg-white shadow-lg shadow-slate-200 ring-1 ring-black ring-opacity-5 focus:outline-none'
  );
};

export const contentStyles = (withDivider: boolean | undefined) => {
  return cx({
    'hover:bg-slate-100 pl-3 pr-8 py-3 cursor-pointer': true,
    'border-b border-gray-100': withDivider,
  });
};
