import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import DropdownMenu from '../../components/DropdownMenu';
import Logo from "../../components/Logo";

import { MAIN_MENU_ROUTERS } from "../../routers/MenuRouters";
import MainMenu from "./MainMenu";
import MobileNavDrawer from './MobileNavDrawer';



export default function Header() {
    const { themeMode } = useSelector((state) => state.setting);
    const {categories} = useSelector((state)=>state.shopping);
    const [navbar, setNavbar] = useState(false);
    return (
        <div className={`flex w-full justify-between p-2 border-b items-center ${themeMode === 'light' ? 'border-stone-300' : 'border-gray-800'}`} >
            <Logo />
            <div className="hidden md:flex">
                <MainMenu routers={MAIN_MENU_ROUTERS} />
            </div>
            <div className="flex sm:hidden">
                <button className="btn btn-sm btn-ghost rounded-full h-8 w-8  p-0" onClick = {()=>(setNavbar(true))}><Icon icon={'dashicons:menu-alt'} /></button>
            </div>
            <div className='hidden sm:flex gap-2'>
                {/* avatar  */}
                <DropdownMenu
                    header={
                        <div className='avatar '>
                            <div className='w-10 rounded-full'>
                                <img src='./assets/avatar.jpg' alt='avatar' />
                            </div>
                        </div>
                    }
                ></DropdownMenu>
                {/* favorite */}

                <div className='relative'>
                    <Link className='btn btn-sm p-1 h-10 w-10 rounded-full btn-ghost' to="/"><Icon icon="ic:twotone-favorite-border" width={28}></Icon></Link>
                    <span className='badge badge-error badge-sm absolute -ml-4'>6</span>
                </div>
                {/* shopping cart */}
                <div className='relative'>
                    <Link className='btn btn-sm p-1 h-10 w-10 rounded-full btn-ghost' to="/"><Icon icon="carbon:shopping-cart-plus" width={24}></Icon></Link>
                    <span className='badge badge-error badge-sm absolute -ml-4'>2</span>
                </div>

            </div>
            {/* mobile nav bar */}
            {navbar && 
                <MobileNavDrawer onClose={()=>setNavbar(false)} open={navbar} routers={MAIN_MENU_ROUTERS}categories = {categories}></MobileNavDrawer>
            }
        </div>
    )
}