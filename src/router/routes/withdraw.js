import { lazy } from 'react'


// ** Merge Routes
const WithdrawRoutes = [
    //authentication routes
    // {
    //     path: '/withdraw-funds',
    //     component: lazy(() => import('../../views/withdraw/WithdrawalHistory'))
    // },
    {
        path: '/withdraw-funds',
        component: lazy(() => import('../../views/withdraw/WithdrawFunds'))

        // component: lazy(() => import('../../views/withdraw/WithdrawalHistory'))
    },
    {
        path: '/withdrawal-history',
        // component: lazy(() => import('../../views/DefaultPage'))

        component: lazy(() => import('../../views/withdraw/WithdrawalHistory'))
    }
]

export { WithdrawRoutes }
