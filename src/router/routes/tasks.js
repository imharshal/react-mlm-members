import { lazy } from 'react'


// ** Merge Routes
const TaskRoutes = [
    //authentication routes
    {
        path: '/tasks',
        component: lazy(() => import('../../views/DefaultPage'))
    }
]

export { TaskRoutes }
