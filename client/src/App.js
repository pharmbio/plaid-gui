import Navbar from "./components/Navbar";
import Instructions from "./components/Instructions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Tool from "./components/Tool";


const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 11rem minmax(50rem, 100%);
`;

const App = () => {
  return (
    <div className="App">
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
