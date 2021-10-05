import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import './App.css';


function App() {

  const [searchString, setSearchString] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target)
  }

  return (
    null
  );
}

export default App;
