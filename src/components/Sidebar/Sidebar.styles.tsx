import cx from 'classnames';

export const asideStyles = (open: boolean) => {
  return cx({
    'flex-shrink-0 flex flex-col transition-all duration-300 text-white bg-slate-900': true,
    'w-56': open,
    'w-[4.4rem]': !open,
  });
};

export const navStyles = () => {
  return cx();
};
