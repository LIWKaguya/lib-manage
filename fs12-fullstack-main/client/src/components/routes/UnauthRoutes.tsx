import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import { setUser } from "redux/slices/user.slice";

const UnauthRoutes = () => {
    const userJSON = window.localStorage.getItem('libmaUser') 
    const dispatch = useAppDispatch()
    if(userJSON) {
        const user = JSON.parse(userJSON)
        dispatch(setUser(user))
        return <Navigate to='/' />
    } 
    return <Outlet />
}
export default UnauthRoutes;