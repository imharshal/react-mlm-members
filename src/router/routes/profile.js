import { lazy } from 'react'


// ** Merge Routes
const ProfileRoutes = [
    //authentication routes

    {
        path: '/profile',
        component: lazy(() => import('../../views/profile')),
        meta: {
        navLink: '/profile'
        }
    }

]

export { ProfileRoutes }
