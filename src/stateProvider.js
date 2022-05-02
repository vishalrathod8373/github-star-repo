import React, {
    createContext,
    useEffect,
    useReducer,
    useMemo,
    useState,
    useContext
} from "react";

export const StateContext = createContext();


export const MainFormObject = createContext({
    mainObject: [],
    setMainObject: () => { },
});


const StateProvider = ({ reducer, children }) => {

    const [mainObject, setMainObject] = useState([]);
    const [state, dispatch] = useReducer(reducer, {});

    const mainFormObject = { mainObject, setMainObject };
    const store = useMemo(
        () => [state, dispatch],
        [state],
    );

    useEffect(() => {


    }, []);
    return (
        <StateContext.Provider value={store}>

            <MainFormObject.Provider value={mainFormObject}>
                {children}
            </MainFormObject.Provider>

        </StateContext.Provider>
    );
};
export const useStateValue = () => useContext(StateContext);

export default StateProvider;
