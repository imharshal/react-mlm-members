import { lazy } from 'react'

// ** Merge Routes
const SidebarRoutes = [
//-------------------------
  //App routes
  {
    path: '/home',
    component: lazy(() => import('../../views/dashboard'))
  },
  {
    path: '/myprofile',
    component: lazy(() => import('../../views/profile'))
  },
  {
    path: 'myprofile/:id',
    component: lazy(() => import('../../views/profile'))
    
  },
  {
    path: '/myteam',
    component: lazy(() => import('../../views/pages/Genealogy'))
  },
  {
    path: '/add-funds',
    component: lazy(() => import('../../views/DefaultPage'))
  },
  {
    path: '/withdraw-funds',
    component: lazy(() => import('../../views/DefaultPage'))
  },
  {
    path: '/update-password',
    component: lazy(() => import('../../views/DefaultPage'))
  },
  {
    path: '/logout',
    component: lazy(() => import('../../views/pages/Logout')),
    layout: 'BlankLayout'

  }
]

export { SidebarRoutes }
