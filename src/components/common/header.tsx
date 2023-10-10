import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetUser } from "../../store/user/user.slice";
import { UserState } from "../../store/user/user.state";
import { AuthService } from "../../utils/auth";

// type Nav = {
//     label: string,
//     key: string,
//     active: boolean,
//     redirect: boolean,
//     to: string
// }

const defaultNav: string = "home";

const navConstants = {
    home: { label: "Home", key: "home", active: true, redirect: true, to: '/home' },
    about: { label: "About", key: "about", active: false, redirect: true, to: '/about' },
    contact_us: { label: "Contact Us", key: "contact_us", active: false, redirect: true, to: '/contact-us' },
    sign_out: { label: "Sign Out", key: "sign_out", active: false, redirect: true, to: '/login' },
    sign_in: { label: "Sign In", key: "sign_in", active: false, redirect: true, to: '/login' }
}

export function HeaderComponent() {

    // const [isUserAuthenticated, setIsUserAuthenticated] = useState(AuthService.isUserAuthenticated());

    const [activeNav, setActiveNav] = useState<string>(defaultNav);

    const isUserAuthenticated: boolean = useSelector((state: {user: UserState}) => {
        // console.log(state);
       return state.user.isLoggedin;
    });

    console.log(isUserAuthenticated);

    const dispatch = useDispatch();

    const signOut = (navKey: string) => {
        setActiveNav(navKey);
        // dispatch({
        //     type: 'resetLoginForm'
        // });

        //reduxjsToolkit approach
        dispatch(resetUser({}))
        AuthService.signOut();
    }

    // const { username } = useEmployees();

    return (
        <div className="header-wrapper w-full">
            <ul className="flex w-full justify-end gap-8">
                <li><Link onClick={() => setActiveNav(navConstants.home.key)} to={navConstants.home.to} className={`${activeNav === navConstants.home.key ? "border-solid border-black border-b-2 font-medium" : ""} ${!isUserAuthenticated ? "pointer-events-none opacity-70": "pointer-events-all opacity-100"} pb-2 transition-all duration-300 hover:border-solid hover:border-black hover:border-b-2 hover:font-medium`}>{navConstants.home.label}</Link></li>
                <li><Link onClick={() => setActiveNav(navConstants.about.key)} to={navConstants.about.to} className={`${activeNav === navConstants.about.key ? "border-solid border-black border-b-2 font-medium" : ""} ${!isUserAuthenticated ? "pointer-events-none opacity-70": "pointer-events-all opacity-100"} pb-2 transition-all duration-300 hover:border-solid hover:border-black hover:border-b-2 hover:font-medium`}>{navConstants.about.label}</Link></li>
                <li><Link onClick={() => setActiveNav(navConstants.contact_us.key)} to={navConstants.contact_us.to} className={`${activeNav === navConstants.contact_us.key ? "border-solid border-black border-b-2 font-medium" : ""} ${!isUserAuthenticated ? "pointer-events-none opacity-70": "pointer-events-all opacity-100"} pb-2 transition-all duration-300 hover:border-solid hover:border-black hover:border-b-2 hover:font-medium`}>{navConstants.contact_us.label}</Link></li>
                {
                    isUserAuthenticated ?
                        <li><Link onClick={() => signOut(navConstants.sign_in.key)} to={navConstants.sign_out.to} className={`${activeNav === navConstants.sign_out.key ? "border-solid border-black border-b-2 font-medium" : ""} pb-2 transition-all duration-300 hover:border-solid hover:border-black hover:border-b-2 hover:font-medium`}>{navConstants.sign_out.label}</Link></li>
                        :
                        <li><Link onClick={() => setActiveNav(navConstants.sign_out.key)} to={navConstants.sign_in.to} className={`${activeNav === navConstants.sign_in.key ? "border-solid border-black border-b-2 font-medium" : ""} pb-2 transition-all duration-300 hover:border-solid hover:border-black hover:border-b-2 hover:font-medium`}>{navConstants.sign_in.label}</Link></li>
                }
            </ul>
        </div>
    )
}

export default HeaderComponent;