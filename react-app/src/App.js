import React from 'react';
// eslint-disable-next-line
import { BrowserRouter, Route, Link } from 'react-router-dom';
// eslint-disable-next-line
import { AuthProvider, AuthForm } from './Auth';
import { ajax } from './utils';
import Navbar from './Navbar';
import MainPage from './MainPage';
import Debug from './Debug';
import ConferenceManager from './ConferenceManager';
import ConferenceEditor from './ConferenceEditor';

class App extends React.Component {
  state = { conferences: [], selected: 0 };

  componentDidMount() {
    this.getConferences();
  }

  getConferences = () => {
    ajax('/conferences/get_all').then(data => {
      const { conferences } = JSON.parse(data);
      conferences.forEach(c => {
        if (c.start_date) c.start_date = c.start_date.slice(0, 10);
        if (c.end_date) c.end_date = c.end_date.slice(0, 10);
      });
      this.setState({ conferences });
    });
  };

  handleConferenceSelect = (event, selected) => this.setState({ selected });

  render() {
    const { conferences, selected } = this.state;
    const brand = conferences[selected]
      ? conferences[selected].short_name
      : 'Loading';
    return (
      <AuthProvider>
        <BrowserRouter>
          <div className="container-fluid">
            <Navbar
              conferences={conferences}
              selected={selected}
              onConferenceSelect={this.handleConferenceSelect}
              brand={brand}
            />
            <Route
              exact
              path="/"
              render={({ match }) => (
                <MainPage conference={conferences[selected]} />
              )}
            />
            {conferences && (
              <Route
                path="/conferences/:id"
                render={({ match }) => (
                  <MainPage
                    conference={conferences.find(
                      c => c.id.toString() === match.params.id
                    )}
                  />
                )}
              />
            )}
            <Route path="/dbg" component={Debug} />
            <Route
              exact
              path="/management"
              render={() => (
                <ConferenceManager
                  conferences={conferences}
                  onUpdate={this.getConferences}
                />
              )}
            />
            <Route
              path="/management/create"
              render={() => <ConferenceEditor onUpdate={this.getConferences} />}
            />
            <Route
              path="/management/edit/:id"
              render={({ match }) => (
                <ConferenceEditor
                  conference={conferences.find(
                    c => c.id.toString() === match.params.id
                  )}
                  onUpdate={this.getConferences}
                />
              )}
            />
          </div>
        </BrowserRouter>
      </AuthProvider>
    );
  }
}

export default App;
