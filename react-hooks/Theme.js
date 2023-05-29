import React, { useContext } from "react";

const ThemeContext = React.createContext("dark");

function Theme () {

    const theme = useContext(ThemeContext);

    return (
        <div>
            <h1>Theme context</h1>
            <p>Theme is: {theme}</p>
            <input type="text" id="newTheme" placeholder="dark"></input>
            {/* <button onClick={changeTheme}>Change</button> */}
        </div>
    )
}

export default Theme;