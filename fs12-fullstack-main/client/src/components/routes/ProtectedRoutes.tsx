import { Center } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";

import { setUser } from "redux/slices/user.slice";
import CustomDrawer from "./CustomDrawer";
import ThemeButton from "./ThemeButton";

const ProtectedRoutes = () => {
    const userJSON = window.localStorage.getItem('libmaUser')
    console.log(window.localStorage.getItem('exp'))
    const dispatch = useAppDispatch()
    if(userJSON) {
        const user = JSON.parse(userJSON)
        dispatch(setUser(user))
        return  (
            <>
                <Center>
                    <ThemeButton />
                    <CustomDrawer />
                </Center>
                <Outlet />
            </>
        )
    }
    return <Navigate to='/login' />
}
export default ProtectedRoutes;