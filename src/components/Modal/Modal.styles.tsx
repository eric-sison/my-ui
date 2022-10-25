import cx from 'classnames';

export const modalHeightStyles = (size: string | undefined) => {
  return cx({
    'flex justify-center p-4 text-center': true,
    'h-[40%] my-5': size === 'sm',
    'h-[55%] my-5': size === 'md',
    'h-[75%] my-5': size === 'lg',
    'h-[90%] my-5': size === 'xl',
    'h-[100%]': size === 'full',
  });
};

export const modalWidthStyles = (size: string | undefined) => {
  return cx({
    'w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all':
      true,
    'max-w-[35%]': size === 'sm',
    'max-w-[45%]': size === 'md',
    'max-w-[60%]': size === 'lg',
    'max-w-[80%]': size === 'xl',
    'max-w-[100%]': size === 'full',
  });
};

export const modalHeaderStyles = (withCloseBtn: boolean | undefined) => {
  return cx({
    'flex items-start justify-between': withCloseBtn,
  });
};

export const modalBodyStyles = (scrollable: boolean | undefined) => {
  return cx({
    'flex-1 overflow-x-hidden my-5': true,
    'overflow-y-auto': scrollable,
    'overflow-y-hidden': !scrollable,
  });
};

export const modalFooterStyles = (alignEnd: boolean | undefined) => {
  return cx({
    'flex items-center gap-2': true,
    'justify-end': alignEnd,
  });
};
