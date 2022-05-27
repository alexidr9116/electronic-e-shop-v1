import { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import SuspenseFallback from '../components/SuspenseFallback';
import DefaultLayout from '../pages/layout/DefaultLayout';

const Loadable = (Component) => (props) => {

    return (
        <Suspense fallback={<SuspenseFallback />}>
            <Component {...props} />
        </Suspense>
    )
}
export default function Router(){
    return useRoutes([
        {
            path:'/',
            element:<DefaultLayout />,
            children:[
                {element:<Home />, index:true}
            ]
        }
    ])
}

const Home = Loadable(lazy(()=>import("../pages/Home")));