import Navbar from "./components/Navbar";
import Instructions from "./components/Instructions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Tool from "./components/Tool";
const GlobalStyle = createGlobalStyle`
/* Global Styles + CSS Reset can be added here */
  *,
  *:after,
  *:before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
html {
  box-sizing: border-box;
  background-color: #f6f6f6;
  color:#5a5b5f;
  font-family: 'Roboto', sans-serif;
}
`;

const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 22vh minmax(75vh, auto);
`;

const App = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <StyledGridWrapper>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/instructions">
              <Instructions />
            </Route>
            <Route path="/tool">
              <Tool />
            </Route>
            <Route path="/publications">
              <h1>This is the publications page!</h1>
            </Route>
            <Route path="/contact">
              <h1>This is the contact page!</h1>
            </Route>
            <Route path="/">
              <h1>This is the home page!</h1>
            </Route>
          </Switch>
        </Router>
      </StyledGridWrapper>
    </div>
  );
};

export default App;
