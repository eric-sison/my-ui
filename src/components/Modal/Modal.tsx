import React, { createContext, ReactNode, useContext } from 'react';
import { FunctionComponent, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  modalBodyStyles,
  modalFooterStyles,
  modalHeaderStyles,
  modalHeightStyles,
  modalWidthStyles,
} from './Modal.styles';
import { Close } from '../Close';

/**
 *  set modal context to control its open and close state
 *  when composed with other components, such as the Header
 */
type ModalContextState = {
  open: boolean;
  setOpen: (show: boolean) => void;
};

/**
 *  set default props for all other components
 *  composed with modal
 */
type Props = {
  children: ReactNode | Array<ReactNode>;
};

/**
 *  set header props
 */
type HeaderProps = Props & {
  withCloseBtn?: boolean;
};

/**
 *  set body props
 */
type BodyProps = Props & {
  scrollable?: boolean;
};

/**
 *  set footer props
 */
type FooterProps = Props & {
  alignEnd?: boolean;
};

/**
 *  compose modal component
 */
type ModalComposition = {
  Header: typeof Header;
  Title: typeof Title;
  Body: typeof Body;
  Footer: typeof Footer;
};

/**
 *  set props for modal component
 */
export type ModalProps = Props & {
  open: boolean;
  setOpen: (state: boolean) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

// initialize modal context
const ModalContext = createContext({} as ModalContextState);

// compose modal component
export const Modal: FunctionComponent<ModalProps> & ModalComposition = ({
  open,
  setOpen,
  size,
  children,
}: ModalProps) => {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className={modalHeightStyles(size)}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={modalWidthStyles(size)}>
                  <ModalContext.Provider value={{ open, setOpen }}>
                    <div className="h-full w-full flex flex-col">{children}</div>
                  </ModalContext.Provider>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

// header component
const Header: FunctionComponent<HeaderProps> = ({ children, withCloseBtn }) => {
  const { setOpen } = useContext(ModalContext);

  return (
    <header className={modalHeaderStyles(withCloseBtn)}>
      {children}
      {withCloseBtn && <Close onClick={() => setOpen(false)} size="sm" />}
    </header>
  );
};

// title component
const Title: FunctionComponent<Props> = ({ children }) => {
  return <div>{children}</div>;
};

// body component
const Body: FunctionComponent<BodyProps> = ({ scrollable, children }) => {
  return <main className={modalBodyStyles(scrollable)}>{children}</main>;
};

// footer component
const Footer: FunctionComponent<FooterProps> = ({ alignEnd, children }) => {
  return <footer className={modalFooterStyles(alignEnd)}>{children}</footer>;
};

// compose modal with header component
Modal.Header = Header;

// compose modal with title component
Modal.Title = Title;

// compose modal with body component
Modal.Body = Body;

// compose modal with footer component
Modal.Footer = Footer;

Header.defaultProps = {
  withCloseBtn: false,
};

Body.defaultProps = {
  scrollable: false,
};

Footer.defaultProps = {
  alignEnd: false,
};

Modal.defaultProps = {
  open: false,
  size: 'md',
};
