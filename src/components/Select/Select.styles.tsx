import cx from 'classnames';

export const selectBtnStyles = () => {
  return cx(
    'flex items-center justify-between w-full border border-slate-200 px-4 py-2 rounded bg-white hover:shadow-sm hover:shadow-slate-200 focus:outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-200 focus:ring-opacity-50'
  );
};

export const selectOptionsStyles = () => {
  return cx(
    'rounded-md bg-white shadow-lg shadow-slate-200 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm overflow-clip'
  );
};

export const selectItemStyles = (withDivider: boolean | undefined, active: boolean, selected: boolean) => {
  return cx({
    'py-3 pl-5 pr-7 cursor-pointer': true,
    ' border-b border-slate-100': withDivider,
    'bg-slate-100': active,
    'bg-indigo-500': selected,
  });
};

export const selectFooterStyles = () => {
  return cx(
    'px-5 py-2 border-t border-slate-200 border-opacity-50 bg-slate-100 bg-opacity-60 flex items-center justify-center'
  );
};
