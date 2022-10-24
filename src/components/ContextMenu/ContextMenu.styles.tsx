import cx from 'classnames';

export const popperStyles = () => {
  return cx(
    'absolute p-2 z-20 w-56 rounded-lg bg-white shadow-lg shadow-slate-200 ring-1 ring-black ring-opacity-5 focus:outline-none'
  );
};

export const itemStyles = (active: boolean) => {
  return cx({
    'p-2 cursor-pointer rounded-md flex items-center gap-2': true,
    'bg-indigo-500 text-white': active,
    'bg-white text-gray-700': !active,
  });
};
