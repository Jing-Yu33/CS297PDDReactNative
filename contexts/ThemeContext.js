import React from "react";

const theme = {
  colors: {
    text: "#F4892C",
    primary: "#F4892C",
    underlineColor: "transparent",
    background: "#003489",
  },
};

const ThemeContext = React.createContext(theme);

const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;

export { ThemeConsumer, ThemeProvider };
