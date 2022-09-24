export const PATH_REDIRECTION_ON_PHONE_SCAN = '/mirror/receiverId/';

export const ROUTES = {
  HOME: {
    path: '/',
    name: 'Home',
  },
  APPS:  {
    path: '/apps',
    name: 'Apps',
  },
  TEAM:  {
    path: '/team',
    name: 'Team',
  },
  MIRROR: {
    path: '/mirror',
    name: 'Mirror',
  },
  MIRROR_WITH_RECEIVER_ID: {
    path: PATH_REDIRECTION_ON_PHONE_SCAN + '*',
    name: 'Mirror'
  },
  MIRROR_SENDER: {
    path: '/mirror/sender',
    name: 'Sender',
  },
  MIRROR_RECEIVER: {
    path: '/mirror/receiver',
    name: 'Receiver',
  },
};
