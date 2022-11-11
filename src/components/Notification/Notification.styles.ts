import cls from 'classnames';

type NotificationPortal = {
  position: 'top-right' | 'bottom-right' | 'top-center' | 'bottom-center' | undefined;
  gutter: 1 | 2 | 3 | 4 | 5 | undefined;
};

export const notifPortalClass = ({ position, gutter }: NotificationPortal) => {
  return cls('fixed z-50 py-3', {
    'top-0 right-0 w-[28rem] pr-3 flex flex-col items-end': position === 'top-right' || position === undefined,
    'bottom-0 right-0 w-[28rem] pr-3 flex flex-col items-end': position === 'bottom-right',
    'flex flex-col items-center w-full top-0': position === 'top-center',
    'flex flex-col items-center w-full bottom-0': position === 'bottom-center',
    'space-y-1': gutter === 1,
    'space-y-2': gutter === 2,
    'space-y-3': gutter === 3 || gutter === undefined,
    'space-y-4': gutter === 4,
    'space-y-5': gutter === 5,
  });
};

export const notifControllerClass = (className: string | undefined) => {
  return cls(className);
};

export const notifClass = (variant: 'success' | 'error' | undefined) => {
  return cls('bg-white border p-5 shadow-lg shadow-slate-200 rounded-lg');
};
