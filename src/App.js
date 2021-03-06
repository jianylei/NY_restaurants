import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import { useHistory } from "react-router"
import './App.css';
import Restaurants from './components/Restaurants';
import Restaurant from './components/Restaurant';
import NotFound from './components/NotFound';
import About from './components/About';


function App() {

  const history = useHistory();

  const [searchString, setSearchString] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/restaurants?borough=${searchString}`);

    setSearchString("");
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>New York Restaurants</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/restaurants">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form onSubmit={handleSubmit} inline>
            <FormControl type="text" placeholder="Borough" className="mr-sm-2" value={searchString}
              onChange={(e) => setSearchString(e.target.value)} />
            <Button type="submit" variant="outline-primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <br />

      <Container>
        <Row>
          <Col>
            <Switch>
              <Route exact path="/"> <Redirect to="/restaurants" /> </Route>
              <Route exact path="/about" component={About} />
              <Route exact path="/restaurants" component={Restaurants} />
              <Route exact path="/restaurant/:id" component={Restaurant} />
              <Route component={NotFound} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
