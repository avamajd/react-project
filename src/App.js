import React from "react";
import "./App.scss";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Switch from "react-router-dom/Switch";
import Route from "react-router-dom/Route";

const theme = createMuiTheme({
  direction: "rtl"
});

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  return (
    <div className="container">
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route exact path="/account" component={Profile} />
          </Switch>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default App;
