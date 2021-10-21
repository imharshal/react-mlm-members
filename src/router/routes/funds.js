import { lazy } from 'react'


// ** Merge Routes
const AddFundsRoutes = [
    //authentication routes
    // {
    //     path: '/withdraw-funds',
    //     component: lazy(() => import('../../views/withdraw/WithdrawalHistory'))
    // },
    {
        path: '/funds',
        component: lazy(() => import('../../views/DefaultPage'))

        // component: lazy(() => import('../../views/withdraw/WithdrawalHistory'))
    },
    {
        path: '/add-funds',
        component: lazy(() => import('../../views/DefaultPage'))

        // component: lazy(() => import('../../views/withdraw/WithdrawalHistory'))
    },
    {
        path: '/funds-history',
        component: lazy(() => import('../../views/DefaultPage'))

        // component: lazy(() => import('../../views/withdraw/WithdrawalHistory'))
    }
]

export { AddFundsRoutes}
