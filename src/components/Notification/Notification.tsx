import { FloatingPortal } from '@floating-ui/react-dom-interactions';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

export type Notification = {
  notificationId?: string;
  content?: JSX.Element;
};

type NotificationOptions = {
  autoClose?: boolean;
  duration?: number;
  position?: 'top-right' | 'bottom-right';
};

type NotificationProps = {
  options?: NotificationOptions;
};

export type NotificationHandle = {
  notify: (notif: Notification) => void;
  generateId: () => string;
  dismiss: (notificationId: string) => void;
};

export const Notification = forwardRef<NotificationHandle, NotificationProps>(({ options }, ref) => {
  // notifications array that will hold all notification items
  const [notifs, setNotifs] = useState<Array<Notification>>([]);

  // the notification item itself
  const [notification, setNotification] = useState<Notification | null>(null);

  // set state to capture hover on notification
  const [hovering, setHovering] = useState(false);

  useImperativeHandle(ref, () => ({
    notify: (notif: Notification) => addNotification(notif),
    generateId,
    dismiss: (notificationId) => dismiss(notificationId),
  }));

  // define a function that will generate a random number as notification id
  const generateId = () => Math.floor(100000000 + Math.random() * 900000000).toString();

  const addNotification = (notif: Notification) => {
    // create a temporary copy of notifs array
    const newNotifs = [...notifs];

    // insert the notif at first index
    newNotifs.unshift(notif);

    // set the new value of notifs array
    setNotifs(newNotifs);
  };

  const dismiss = (notificationId: string) => {
    // create a copy of notifs array
    const newNotifs = [...notifs];

    // loop through the new array
    newNotifs.map((notif, index) => {
      // check if current notif's id is equal to the passed notif id
      if (notif.notificationId === notificationId) {
        // remove notif at current index
        newNotifs.splice(index, 1);

        // set new value for notifs arrat
        setNotifs(newNotifs);

        // break away from the loop
        return;
      }
    });
  };

  useEffect(() => {
    // dismiss the current notification
    if (notification) dismiss(notification.notificationId as string);
  }, [notification, setNotifs]);

  useEffect(() => {
    // initialize this timer
    var timer: any;

    // check all conditions
    if (!hovering && options?.autoClose && notifs.length !== 0) {
      // get the oldest notification item from notifs array
      const oldestNotif = notifs[notifs.length - 1];

      // set oldest notification item as the current notification to dismiss
      timer = setTimeout(() => setNotification(oldestNotif), options?.duration);
    }

    // clean up timer
    return () => clearTimeout(timer);
  }, [hovering, notifs, setNotification]);

  return (
    <FloatingPortal id="floating-ui-notification-portal">
      <div
        className={`${options?.position === 'top-right' ? 'top-0 right-0' : 'bottom-0 right-0'} fixed pr-5 py-5 z-50`}
      >
        <AnimatePresence>
          {notifs.map((notification: Notification) => {
            return (
              <LayoutGroup key={notification.notificationId}>
                <motion.div
                  layout
                  key={notification.notificationId}
                  initial={{ opacity: 1, y: options?.position === 'top-right' ? -50 : 50 }}
                  animate={{ opacity: 1, y: 0, transition: { when: 'afterChildren' } }}
                  exit={{ opacity: 0, translateX: 20, transition: { duration: 0.5, when: 'beforeChildren' } }}
                >
                  <div
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    className="bg-white p-5 rounded-md shadow-lg shadow-slate-200 max-w-sm flex items-center justify-between mb-3 border"
                    key={notification.notificationId}
                  >
                    <div className="w-full">{notification.content}</div>
                  </div>
                </motion.div>
              </LayoutGroup>
            );
          })}
        </AnimatePresence>
      </div>
    </FloatingPortal>
  );
});

Notification.defaultProps = {
  options: {
    autoClose: false,
    duration: 3000,
    position: 'top-right',
  },
};
