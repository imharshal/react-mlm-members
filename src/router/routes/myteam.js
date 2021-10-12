import { lazy } from 'react'


// ** Merge Routes
const MyteamRoutes = [
    //authentication routes
    {
        path: '/team/details',
        component: lazy(() => import('../../views/team/Details'))
    },
    {
        path: '/team/matrix',
        component: lazy(() => import('../../views/team/Matrix'))
    }
]

export { MyteamRoutes}
