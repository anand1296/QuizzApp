import FooterComponent from "../common/footer";
import HeaderComponent from "../common/header";
import "../../styles/common.scss"

export function MainLayout({ children }: any) {
    console.log(children);
    return (<>
        <header>
            <HeaderComponent/>
        </header>
        <div className="main">
            {children}
        </div>
        <footer>
            <FooterComponent/>
        </footer>
    </>)
}

export default MainLayout;