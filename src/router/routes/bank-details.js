import { lazy } from 'react'


// ** Merge Routes
const BankDetailsRoute = [
    //authentication routes
    {
        path: '/bank-details',
        component: lazy(() => import('../../views/pages/BankDetails'))

        // component: lazy(() => import('../../views/team/Details'))
    }
]

export { BankDetailsRoute }
