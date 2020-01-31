import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "./App.css";
import Axios from "axios";
import CountryDetail from "./components/CountryDetail";

class App extends Component {
  constructor() {
    super();
    this.state = {
      countries: []
    };
  }
  componentDidMount() {
    Axios.get("https://raw.githubusercontent.com/mledoze/countries/master/countries.json")
      .then(result => {
        this.setState({ countries: result.data });
      })
      .catch(err => console.error(err));
  }
  render() {
    // console.log(this.state.countries[249])
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-primary mb-3">
          <div className="container">
            <a className="navbar-brand" href="/">
              WikiCountries
            </a>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-5" style={{ maxHeight: "90vh", overflow: "scroll" }}>
              <div className="list-group">
                {this.state.countries.map(item => (
                  <NavLink key={item.cca3} className="list-group-item list-group-item-action" to={`/${item.cca3}`}>
                    {item.flag} {item.name.common}
                  </NavLink>
                ))}
              </div>
            </div>
            <Switch>
              <Route exact path="/" component={null} />
              <Route
                path="/:id"
                render={props =>
                  this.state.countries.length > 0 ? <CountryDetail countries={this.state.countries} {...props} /> : null
                }
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;