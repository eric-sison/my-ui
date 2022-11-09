import { MutableRefObject, useRef } from 'react';
import { NotificationControllerHandle, notifId } from './NotificationController';

export const useNotification = () => {
  // create a reference to the notification controller
  const notifRef = useRef() as MutableRefObject<NotificationControllerHandle>;

  // create a function to show notification
  const notify = (content: JSX.Element) => {
    // generate a notification id
    const notificationId = notifId();

    // compose the notification
    const notification = { notificationId, content };

    // show the notification component
    notifRef.current.notify(notification);

    // return the created notificaiton
    return notification;
  };

  // create a function to dismiss the notification
  const dismiss = (id: string) => notifRef.current.dismiss(id);

  // return so that parent components can access these
  return { notifRef, notify, dismiss };
};
