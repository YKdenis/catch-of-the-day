import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StorePicker from "./storePicker.jsx";
import App from "./App.jsx";
import notFound from "./notFound.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        <Route component={notFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
