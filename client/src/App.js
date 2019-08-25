import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Rauter, Route } from "react-router-dom";
import store from "./store";
import { getItems } from "./actions/shoeActions";
import Navbar from "./components/Navbar";
import Shoes from "./components/Shoes";
import ShoeDetails from "./components/ShoeDetails";
import Register from "./components/Register";
import Login from "./components/Login";
import { loadUser } from "./actions/authActions";
import Order from "./components/Order";
import DashBoard from "./components/DashBoard";
class App extends Component {
  componentDidMount() {
    store.dispatch(getItems());
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Rauter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Shoes} />
            <Route exact path="/shoe/:id" component={ShoeDetails} />
            <Route exact path="/user/registration" component={Register} />
            <Route exact path="/user/login" component={Login} />
            <Route exact path="/items/order" component={Order} />
            <Route
              exact
              path="/items/order/successfully_placed"
              component={DashBoard}
            />
          </div>
        </Rauter>
      </Provider>
    );
  }
}

export default App;
