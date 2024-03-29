import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Admin Dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Resident Dashboard',
    path: '/resident-dash',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Intervention Plans',
    path: 'plan',
    icon: icon('ic_cart'),
  },
  {
    title: 'residents',
    path: '/user',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  {
    title: 'resources',
    path: '/resource',
    icon: icon('ic_blog'),
  },
  {
    title: 'messages',
    path: '/messages',
    icon: icon('ic_notification_chat'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
