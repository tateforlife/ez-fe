import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Applications',
      type: 'item',
      url: '/dashboard/applications',
      icon: PendingActionsIcon,
      breadcrumbs: false
    },
    {
      id: 'documents',
      title: 'Documents',
      type: 'item',
      url: '/dashboard/documents',
      icon: TopicOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
