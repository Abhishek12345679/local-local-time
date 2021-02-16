import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from "react-router-dom";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Support from "./pages/Support";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/" exact component={App} />
      <Route path="/about" exact component={About} />
      <Route path="/contactus" exact component={ContactUs} />
      <Route path="/support" exact component={Support} />
    </BrowserRouter>




  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
