import { createContext,useReducer } from "react";

const ThemeContexttt = createContext();
//get theme from localstorage
const localStTheme = localStorage.getItem("localtheme") 

const initialData = {theme : localStTheme || "light"};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_THEME": {
      return { ...state, theme: action.newTheme };
    }
  }
  throw Error("Unknown action: " + action.type);
}

export function ThemeProvider({children}){
  const [firstState , dispatch] = useReducer(reducer,initialData);

  const changeTheme = (toggledTheme)=>{
    localStorage.setItem("localtheme",toggledTheme)
     dispatch({
      type: `CHANGE_THEME`,
      newTheme: toggledTheme,
    });
  }
  return (
    <ThemeContexttt.Provider value={{...firstState,changeTheme}}>
      {children}
    </ThemeContexttt.Provider>
  )
}

export default ThemeContexttt