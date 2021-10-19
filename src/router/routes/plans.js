import { lazy } from 'react'


// ** Merge Routes
const PlansRoutes = [
    //authentication routes
    {
        path: '/plans',
        component: lazy(() => import('../../views/plans/Plans'))
    },
    {
        path: '/plans/active',
        component: lazy(() => import('../../views/DefaultPage'))

        // component: lazy(() => import('../../views/plans/ActivePlans'))
    }
]

export { PlansRoutes }
