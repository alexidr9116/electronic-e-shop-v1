import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import TopHeader from "./TopHeader";
import SearchHeader from "./Header";

export default function DefaultLayout() {

    return (
        <main className='px-auto container'>
            <TopHeader />
            <Header />
            <SearchHeader />
            <Outlet />
            <Footer />
        </main>
    );
}