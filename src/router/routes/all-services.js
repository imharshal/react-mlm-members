import { lazy } from 'react'


// ** Merge Routes
const AllServicesRoutes = [
    //authentication routes
    {
        path: '/mobile-recharge',
        component: lazy(() => import('../../views/DefaultPage'))
    },
    {
        path: '/dth-recharge',
        component: lazy(() => import('../../views/DefaultPage'))
    },
    {
        path: '/bill-pay',
        component: lazy(() => import('../../views/DefaultPage'))
    },
    {
        path: '/insurance',
        component: lazy(() => import('../../views/DefaultPage'))
    },
    {
        path: '/new-pancard',
        component: lazy(() => import('../../views/DefaultPage'))
    }
    

]

export { AllServicesRoutes }
