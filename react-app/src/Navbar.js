import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, AuthForm } from './Auth';

const Navbar = ({ conferences, selected, onConferenceSelect, brand }) => {
  const links = conferences.map(conference => (
    <Link
      to={`/conferences/${conference.id}`}
      className={
        selected === conference.id - 1
          ? 'dropdown-item active'
          : 'dropdown-item'
      }
      key={conference.id}
      onClick={event => onConferenceSelect(event, conference.id - 1)}>
      {conference.short_name}
    </Link>
  ));

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ marginBottom: '20px' }}>
      <Link to="/" className="navbar-brand">
        {brand}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href=""
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Конференции
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {links}
            </div>
          </li>
          <AuthContext.Consumer>
            {context =>
              context.state.email === 'admin' &&
              context.state.status && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href=""
                    id="adminDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    Администрирование
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="adminDropdown">
                    <Link
                      to={`/articles/${selected}`}
                      className="dropdown-item">
                      Научные статьи
                    </Link>
                    <Link to="/letter" className="dropdown-item">
                      Сформировать письмо
                    </Link>
                    <div className="dropdown-divider" />
                    <Link to="/management" className="dropdown-item">
                      Управление конференциями
                    </Link>
                  </div>
                </li>
              )
            }
          </AuthContext.Consumer>
        </ul>
        <AuthForm />
      </div>
    </nav>
  );
};

export default Navbar;
