import React from 'react';
import { Link } from 'react-router-dom';
import { ajax } from './utils';

class ConferenceManager extends React.Component {
  handleDelete = (event, id) => {
    event.preventDefault();
    if (window.confirm('Удалить конференцию?'))
      ajax('/conferences/delete', { id }).then(data => {
        console.log(data);
        alert('Конференция успешно удалена');
        this.props.onUpdate();
      });
  };

  render() {
    const { conferences } = this.props;
    const items = conferences.map(c => (
      <li href="" className="list-group-item" key={c.id}>
        {c.short_name}
        <div
          className="btn-group float-right"
          role="group"
          aria-label="Basic example">
          <Link
            to={`/management/edit/${c.id}`}
            className="btn btn-outline-primary">
            Редактировать
          </Link>
          <button
            className="btn btn-outline-danger"
            onClick={event => this.handleDelete(event, c.id)}>
            Удалить
          </button>
        </div>
      </li>
    ));
    return (
      <div className="container">
        <div className="row" style={{ marginTop: '20px' }}>
          <div className="col">
            <h3>Управление конференциями</h3>
          </div>
          <div className="col">
            <Link
              to="/management/create"
              className="btn btn-success float-right">
              Создать конференцию
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ul className="list-group list-group-flush">{items}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ConferenceManager;
