import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategorySearchInput from "../../components/CategorySearchInput";
import DropdownMenu from "../../components/DropdownMenu";

export default function SearchHeader() {
    const { categories } = useSelector((state) => state.shopping);
    
    return (
        <div className="p-4 bg-rose-500 w-screen  absolute left-0">
            <div className="container flex w-full justify-center lg:justify-between items-center">
                <div className="hidden lg:flex">
                    <DropdownMenu
                        contentClass="w-60 mt-1"
                        header={
                            <button className="flex text-white gap-2 p-4 rounded-lg items-center bg-white/10 cursor-pointer">
                                <Icon width={20} className="flex-none" icon={"dashicons:menu-alt"}></Icon>
                                <label className="flex-1">Shop By Categories</label>
                                <Icon width={20} className="flex-none" icon={"akar-icons:chevron-down"}></Icon>
                            </button>
                        }
                        items={
                            categories.map((category, index) => (
                                <Link to={`/products/shop-by-category/${category.key}`} className="w-full flex gap-4 py-2">
                                    <Icon icon={`${category.icon}`} width={20} className="flex-none"></Icon>
                                    <label className="flex-1">{category.value}</label>

                                </Link>
                            ))
                        }
                    >

                    </DropdownMenu>
                </div>
                <div className="flex">
                    <CategorySearchInput categories={categories}></CategorySearchInput>
                </div>
            </div>
        </div>
    )
}