import { lazy } from 'react'


// ** Merge Routes
const IncomeReportRoutes = [
    //authentication routes
    {
        path: '/level-income',
        component: lazy(() => import('../../views/DefaultPage'))
        // component: lazy(() => import('../../views/income-reports/income-report'))
    },
    {
        path: '/direct-income',
        component: lazy(() => import('../../views/DefaultPage'))
        // component: lazy(() => import('../../views/income-reports/income-report'))
    },
    {
        path: '/daily-income',
        component: lazy(() => import('../../views/DefaultPage'))
        // component: lazy(() => import('../../views/income-reports/income-report'))
    },
    {
        path: '/reward-income',
        component: lazy(() => import('../../views/DefaultPage'))
        // component: lazy(() => import('../../views/income-reports/income-report'))
    }


    // {
    //     path: '/plans/active',
    //     component: lazy(() => import('../../views/plans/ActivePlans'))
    // }
]

export { IncomeReportRoutes}
