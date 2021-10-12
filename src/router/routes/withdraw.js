import { lazy } from 'react'


// ** Merge Routes
const WithdrawRoutes = [
    //authentication routes
    {
        path: '/withdraw-funds',
        component: lazy(() => import('../../views/withdraw/WithdrawFunds'))
    },
    {
        path: '/withdrawal-history',
        component: lazy(() => import('../../views/withdraw/WithdrawalHistory'))
    }
]

export { WithdrawRoutes}
