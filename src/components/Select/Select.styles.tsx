import cx from 'classnames';
import { ListState } from './Select';

export const selectBtnStyles = (full: boolean | undefined, size: 'xs' | 'sm' | 'md' | 'lg' | undefined) => {
  return cx({
    'flex items-center justify-between border border-slate-200 rounded bg-white hover:shadow-sm hover:shadow-slate-200 focus:outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-200 focus:ring-opacity-50':
      true,

    'pl-3 pr-2 py-2 text-xs': size === 'xs' && full,
    'pl-3 pr-2 py-2 text-sm': size === 'sm' && full,
    'pl-3 pr-2 py-2 text-base': size === 'md' && full,
    'pl-3 pr-2 py-2 text-lg': size === 'lg' && full,

    'px-2 py-1 text-xs': size === 'xs' && !full,
    'px-2 py-2 text-sm': size === 'sm' && !full,
    'px-2 py-2 text-base': size === 'md' && !full,
    'px-3 py-2 text-lg': size === 'lg' && !full,

    'w-full': full,
  });
};

export const selectSvgStyles = (size: 'xs' | 'sm' | 'md' | 'lg' | undefined) => {
  return cx({
    'w-3 h-3': size === 'xs',
    'w-4 h-4': size === 'sm',
    'w-5 h-5': size === 'md',
    'w-6 h-6': size === 'lg',
  });
};

export const selectOptionsStyles = (spaceY: boolean | undefined) => {
  return cx(
    'rounded-md bg-white shadow-lg shadow-slate-200 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm overflow-clip',
    { 'py-2': spaceY }
  );
};

export const selectItemStyles = (
  { active, selected }: ListState,
  centerItems: boolean | undefined,
  withDivider: boolean | undefined,
  getReferenceWidth: boolean | undefined,
  size: 'xs' | 'sm' | 'md' | 'lg' | undefined
) => {
  return cx({
    'cursor-pointer': true,
    'py-3 pl-5 pr-7': !centerItems,
    'text-center': centerItems,
    'p-2': getReferenceWidth,
    'px-2 py-1': !getReferenceWidth && size === 'xs',
    'px-3 py-1': !getReferenceWidth && size === 'sm',
    'px-4 py-2': !getReferenceWidth && size === 'md',
    'px-5 py-2': !getReferenceWidth && size === 'lg',
    'border-b border-slate-100': withDivider,
    'bg-slate-100': active,
    'text-white bg-indigo-500': selected,
  });
};

export const selectFooterStyles = () => {
  return cx(
    'px-5 py-2 border-t border-slate-200 border-opacity-50 bg-slate-100 bg-opacity-60 flex items-center justify-center'
  );
};
