import { lazy } from 'react'


// ** Merge Routes
const IncomeReportRoutes = [
    //authentication routes
    {
        path: '/level-income',
        // component: lazy(() => import('../../views/DefaultPage'))
        component: lazy(() => import('../../views/income-reports/LevelIncomeHistory'))
    },
    {
        path: '/direct-income',
        // component: lazy(() => import('../../views/DefaultPage'))
        component: lazy(() => import('../../views/income-reports/DirectIncomeHistory'))
    },
    {
        path: '/daily-income',
        // component: lazy(() => import('../../views/DefaultPage'))
        component: lazy(() => import('../../views/income-reports/DailyIncomeHistory'))
    },
    {
        path: '/reward-income',
        // component: lazy(() => import('../../views/DefaultPage'))
        component: lazy(() => import('../../views/income-reports/RewardIncomeHistory'))
    }


    // {
    //     path: '/plans/active',
    //     component: lazy(() => import('../../views/plans/ActivePlans'))
    // }
]

export { IncomeReportRoutes}
