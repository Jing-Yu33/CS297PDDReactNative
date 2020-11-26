import React from "react";

const theme = {
  colors: {
    text: "#ffc909",
    primary: "#ffc909",
    underlineColor: "transparent",
    background: "#003489",
  },
};

const ThemeContext = React.createContext(theme);

const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;

export { ThemeConsumer, ThemeProvider };
