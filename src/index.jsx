//Imported components
import { createRoot } from 'react-dom/client';

import { MainView } from '../components/main-view/main-view';

import "bootstrap/dist/css/bootstrap.min.css";

//Import statement to indicate that you need to bundle `./index.scss`
import  "./index.scss";

import { Container } from 'react-bootstrap';
import React from "react";

const TinFlicksApplication = () => {
return <Container> <MainView /> </Container>
};

//Finds the root of app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render app in the root DOM element
root.render(<TinFlicksApplication />);