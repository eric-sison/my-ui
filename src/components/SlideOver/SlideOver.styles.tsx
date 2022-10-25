import cx from 'classnames';

export const panelStyles = (size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | undefined) => {
  return cx({
    'pointer-events-auto relative w-screen': true,
    'max-w-sm': size === 'sm',
    'max-w-md': size === 'md',
    'max-w-lg': size === 'lg',
    'max-w-xl': size === 'xl',
    'max-w-2xl': size === '2xl',
  });
};

export const slideOverHeaderStyles = (withCloseBtn: boolean | undefined) => {
  return cx({
    'p-5': true,
    'flex items-start justify-between': withCloseBtn,
  });
};

export const slideOverFooterStyles = (alignEnd: boolean | undefined) => {
  return cx({
    'p-5 flex items-center gap-2 text-gray-200': true,
    'justify-end': alignEnd,
  });
};
