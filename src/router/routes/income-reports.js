import { lazy } from 'react'


// ** Merge Routes
const IncomeReportRoutes = [
    //authentication routes
    {
        path: '/income-reports',
        component: lazy(() => import('../../views/DefaultPage'))
        // component: lazy(() => import('../../views/income-reports/income-report'))
    }
    // {
    //     path: '/plans/active',
    //     component: lazy(() => import('../../views/plans/ActivePlans'))
    // }
]

export { IncomeReportRoutes}
