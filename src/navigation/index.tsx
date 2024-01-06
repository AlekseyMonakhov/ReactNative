import { NavigationContainer } from "@react-navigation/native";
import HomeTabs from "./homeTabs";
import AuthStack from "./authStack";
import useAuth from "../hooks/useAuth";
import { useContext, useEffect } from "react";
import { AuthContext } from "../ctx/AuthContext";

const Navigator = () => {

    const { token } = useContext(AuthContext);




    return (
        <NavigationContainer>
            {token ?
                <HomeTabs />
                :
                <AuthStack />}
        </NavigationContainer>
    )
}


export default Navigator;