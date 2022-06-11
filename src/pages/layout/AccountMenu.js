import { t } from 'i18next';
import PropTypes from 'prop-types';
import { Link,useNavigate } from 'react-router-dom';

AccountMenu.propTypes = {
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    onClose:PropTypes.func
}
export default function AccountMenu({ user, isAuthenticated,logout,onClose }) {
    const navigate = useNavigate();
    return (
        <div className="grid gap-2 w-full ">
            {isAuthenticated && user &&
                <>
                    <Link onClick={onClose} to = {`/profile`} className = {`btn btn-ghost btn-sm flex justify-start`}>{t('menu.profile')}</Link>
                    <button onClick={()=>{onClose(); logout(); navigate('/',{replace:true});}} className = {`btn btn-ghost btn-sm flex justify-start`}>{t('menu.logout')}</button>
                </>
            }
        </div>
    )
}