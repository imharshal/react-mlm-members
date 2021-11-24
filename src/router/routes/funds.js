import { lazy } from 'react'


// ** Merge Routes
const AddFundsRoutes = [
    //authentication routes
    // {
    //     path: '/withdraw-funds',
    //     component: lazy(() => import('../../views/withdraw/WithdrawalHistory'))
    // },
    {
        path: '/fund-transfer',
        component: lazy(() => import('../../views/funds/TransferFund'))
    },
    {
        path: '/funds',
        component: lazy(() => import('../../views/funds/AllFunds'))
    },
    {
        path: '/add-funds',
        component: lazy(() => import('../../views/funds/AddFunds'))
        // component: lazy(() => import('../../views/DefaultPage'))

        // component: lazy(() => import('../../views/withdraw/WithdrawalHistory'))
    },
    {
        path: '/funds-history',
        component: lazy(() => import('../../views/funds/FundHistory'))

        // component: lazy(() => import('../../views/withdraw/WithdrawalHistory'))
    }
]

export { AddFundsRoutes }
