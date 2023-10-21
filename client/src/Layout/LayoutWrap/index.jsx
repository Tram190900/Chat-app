import { Outlet } from "react-router-dom"
import Style from './Layout.module.scss'

const Layout = () =>{
    return(
        <div className={Style.layoutContainer}>
            <Outlet/>
        </div>
    )
}
export default Layout