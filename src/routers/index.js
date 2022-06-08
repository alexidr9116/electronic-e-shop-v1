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
                {element:<Home />, index:true},
                {element:<Shopping />, path:'/shopping'},
                {element:<ProductDetail />, path:'/product-detail/:productId'}
            ]
        }
    ])
}

const Home = Loadable(lazy(()=>import("../pages/Home")));
const Shopping = Loadable(lazy(()=>import("../pages/client/Shopping")));
const ProductDetail = Loadable(lazy(()=>import('../pages/client/ProductDetail')));