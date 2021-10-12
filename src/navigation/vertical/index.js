import { Mail, Home, Settings, LogOut, Edit3, Send, DownloadCloud, DollarSign, Users, Slack, User, Eye, Activity, PlayCircle, Layers, Monitor, Trello, DivideSquare, BookOpen } from 'react-feather'
import { Treemap } from 'recharts'

export default [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'profile',
    title: 'My Profile',
    icon: <User size={20} />,
    navLink: '/profile'
  },
  {
    id: 'myteam',
    title: 'My Team',
    icon: <Users size={20} />,
    children:[
      {
        id: 'my-team-list',
        title: 'Team Details',
        icon: <BookOpen size={20} />,
        navLink: '/team/details'
      },
      {
        id: 'my-team-matrix',
        title: 'Team Matrix',
        icon: <DivideSquare size={20} />,
        navLink: '/team/matrix'
      }
    ]
  },
  {
    id: 'plans',
    title: 'My Plans',
    icon: <Layers size={20} />,
    children:[
      {
        id: 'all-plan',
        title: 'Explore Plans',
        icon: <Eye size={20} />,
        navLink: '/plans'
      },
      {
        id: 'active-plan',
        title: 'Active Plan',
        icon: <Activity size={20} />,
        navLink: '/plans/active'
      }
    ]
   
  },
  {
    id: 'withdraw',
    title: 'Withdraw',
    icon: <DollarSign size={20} />,
    children:[
      {
        id: 'withdraw-funds',
        title: 'Withdraw Funds',
        icon: <PlayCircle size={20} />,
        navLink: '/withdraw-funds'
      },
      {
        id: 'payout',
        title: 'Withdrawal History',
        icon: <PlayCircle size={20} />,
        navLink: '/withdrawal-history'
      }
    ]
    
  },
  {
    id: 'income-reports',
    title: 'Income Reports',
    icon: <Trello size={20} />,
    navLink: '/income-reports'
  },
  {
    id: 'update-password',
    title: 'Update Password',
    icon: <Edit3 size={20} />,
    navLink: '/update-password'
  },
  {
    id: 'logout',
    title: 'Logout',
    icon: <LogOut size={20} />,
    navLink: '/logout'
  }

]
