import { Mail, Home, Settings, LogOut, Edit3, Send, DownloadCloud, DollarSign, Users, Slack, User, Eye, Activity, PlayCircle, Layers, Monitor, Trello, DivideSquare, BookOpen, FilePlus, Download } from 'react-feather'
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
    children: [
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
    navLink: '/plans'

    // children:[
    //   {
    //     id: 'all-plan',
    //     title: 'Explore Plans',
    //     icon: <Eye size={20} />,
    //     navLink: '/plans'
    //   },
    //   {
    //     id: 'active-plan',
    //     title: 'Active Plan',
    //     icon: <Activity size={20} />,
    //     navLink: '/plans/active'
    //   }
    // ]

  },
  {
    id: 'bank-details',
    title: 'Bank Details',
    icon: <FilePlus size={20} />,
    navLink: '/bank-details'
  },
  {
    id: 'funds',
    title: 'Add Funds',
    icon: <Download size={20} />,
    children: [
      {
        id: 'addFunds',
        title: 'Add Funds',
        icon: <PlayCircle size={20} />,
        navLink: '/add-funds'
      },
      {
        id: 'availFunds',
        title: 'Available funds',
        icon: <PlayCircle size={20} />,
        navLink: '/funds'
      },
      {
        id: 'fundHistory',
        title: 'Funds History',
        icon: <PlayCircle size={20} />,
        navLink: '/funds-history'
      }
    ]

  },
  {
    id: 'withdraw',
    title: 'Withdraw',
    icon: <DollarSign size={20} />,
    children: [
      {
        id: 'withdrawFunds',
        title: 'IMPS Withdraw',
        icon: <PlayCircle size={20} />,
        navLink: '/withdraw-funds'
      },
      {
        id: 'withdrawHistory',
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
    children: [
      {
        id: 'daily-income',
        title: 'Daily Income',
        icon: <PlayCircle size={20} />,
        navLink: '/daily-income'
      },
      {
        id: 'level-income',
        title: 'Level Income',
        icon: <PlayCircle size={20} />,
        navLink: '/level-income'
      },
      {
        id: 'direct-income',
        title: 'Direct Income',
        icon: <PlayCircle size={20} />,
        navLink: '/direct-income'
      },
      {
        id: 'reward-income',
        title: 'Reward Income',
        icon: <PlayCircle size={20} />,
        navLink: '/reward-income'
      }
    ]
  },

  {
    id: 'task-details',
    title: 'Tasks',
    icon: <Monitor size={20} />,
    navLink: '/tasks'
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
