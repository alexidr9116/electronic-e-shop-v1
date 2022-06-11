import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from "../../components/DropdownMenu";

export default function MainMenu({ routers = [] }) {
    const [close,setClose] = useState(false);
    return (
        <div className="flex gap-2">
            {routers.map((router, index) => (
                <React.Fragment  key={index}>
                    {
                        router.elements && <DropdownMenu
                            close ={close}
                            header={
                                <button className="btn btn-sm px-2  btn-ghost" onClick={()=>setClose(false)}>{router.title}</button>
                            }
                            items={
                                router.elements.map((item, subIndex) => (
                                    <Link onClick={()=>setClose(true)} className='p-2 btn btn-sm btn-ghost justify-start' to={item.path} key={`sub-${subIndex}`}>{item.title}</Link>
                                ))
                            }
                        />
                    }
                    {
                        !router.elements &&
                        <button className="btn btn-sm px-2  btn-ghost">{router.title}</button>

                    }
                </React.Fragment>

            ))}
        </div>
    )
}