import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, FunctionComponent, ReactNode } from 'react';
import { promptPanelStyles, promptContainerStyles, promptOverlayStyles, promptFooterStyles } from './Alert.styles';

type Props = {
  children: ReactNode | Array<ReactNode>;
};

type FooterProps = Props & {
  alignEnd?: boolean;
};

type AlertComposition = {
  Title: typeof Title;
  Description: typeof Description;
  Footer: typeof Footer;
};

export type AlertProps = Props & {
  open: boolean;
  setOpen: (state: boolean) => void;
};

export const Alert: FunctionComponent<AlertProps> & AlertComposition = ({ open, setOpen, children }) => {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={promptOverlayStyles()} />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className={promptContainerStyles()}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={promptPanelStyles()}>{children}</Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const Title: FunctionComponent<Props> = ({ children }) => {
  return <header>{children}</header>;
};

const Description: FunctionComponent<Props> = ({ children }) => {
  return <main>{children}</main>;
};

const Footer: FunctionComponent<FooterProps> = ({ alignEnd, children }) => {
  return <footer className={promptFooterStyles(alignEnd)}>{children}</footer>;
};

Alert.Title = Title;

Alert.Description = Description;

Alert.Footer = Footer;

Footer.defaultProps = {
  alignEnd: false,
};

Alert.defaultProps = {
  open: false,
};
