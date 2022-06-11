import { useState } from "react";
import { t } from "i18next";
import { Link, useNavigate } from "react-router-dom";
import parser from "html-react-parser";
import { toast } from "react-hot-toast";

import Page from "../../components/Page";
import useAuth from "../../hook/useAuth";


export default function EmailVerify() {
    const {user} = useAuth();
    
 
    return (
        <Page className="flex w-full justify-center mt-10 pb-10" title="Verify Your Email">
            <div className="flex  w-11/12 sm:w-[450px]  flex-col items-center ">
                {/* image */}
                <div className=" w-32 h-32  overflow-hidden mb-8  ">
                    <img alt="email" className="w-32 h-32" src={`/assets/email-verify.svg`}></img>
                </div>
                <label className="text-3xl font-bold mb-8">
                    {t('auth.verify-title')}
                </label>
                <label className="break-all">
                    {t('auth.verify-description')}
                </label>
                <label className="font-bold  mb-4 "> {user?.email}</label>
                <label className="break-all mb-8">
                    {t('auth.verify-sub-description')}
                </label>
                <label className="break-all mb-8">
                    {t('auth.verify-sub-title')}
                </label>
                <div className="w-full px-4 sm:px-10 grid gap-4 justify-center">
                    
                    <button className={`btn btn-accent btn-outline mb-8 w-full`}>{t('auth.resend')}</button>
                </div>
            </div>
        </Page>
    )
}