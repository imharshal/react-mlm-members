import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Cashmind'

// ** Default Route
const DefaultRoute = '/home'

import { PlansRoutes } from "./plans"
import { ProfileRoutes } from "./profile"
import { WithdrawRoutes } from "./withdraw"
import { IncomeReportRoutes } from "./income-reports"
import { SidebarRoutes } from './sidebar'
import { MyteamRoutes } from './myteam'
import { BankDetailsRoute } from './bank-details'
import { AddFundsRoutes } from './funds'
import { AllServicesRoutes } from './all-services'

// ** Merge Routes
const Routes = [
  //authentication routes
  {
    path: '/login',
    component: lazy(() => import('../../views/pages/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/forgot-password/:token',
    component: lazy(() => import('../../views/pages/ResetPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/signup',
    component: lazy(() => import('../../views/signup')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  
  {
    path: '/ref/:username',
    component: lazy(() => import('../../views/signup')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/misc/Error')),
    layout: 'BlankLayout'
  },
  ...SidebarRoutes,
  ...PlansRoutes,
  ...ProfileRoutes,
  ...MyteamRoutes,
  ...WithdrawRoutes,
  ...IncomeReportRoutes,
  ...BankDetailsRoute,
  ...AddFundsRoutes,
  ...AllServicesRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
