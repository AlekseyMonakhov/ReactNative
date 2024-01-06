import { useState, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

const useAppState = () => {
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        const onChange = (state: AppStateStatus) => {
            setAppState(state);
        };

        const sub = AppState.addEventListener("change", onChange);

        return () => {
            sub.remove();
        };
        
    }, []);

    return appState === "active";
};

export default useAppState;
