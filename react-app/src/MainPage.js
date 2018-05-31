import React from 'react';

const MainPage = ({ conference }) => {
  if (!conference) return null;
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <nav className="nav">
            <a className="nav-link" href="">
              Участники
            </a>
            <a className="nav-link" href="">
              Организационный комитет
            </a>
            <a className="nav-link" href="">
              Контакты
            </a>
            <a className="nav-link" href="">
              Совместные мероприятия
            </a>
          </nav>
        </div>
      </div>
      <div className="row" style={{ marginBottom: '20px' }}>
        <div className="col">
          <h2>{conference.full_name}</h2>
        </div>
      </div>
      <div className="row" style={{ marginBottom: '20px' }}>
        <div className="col">{conference.purposes}</div>
      </div>
      <div className="row" style={{ marginBottom: '20px' }}>
        <div className="col-3">
          <b>Место проведения: </b>
        </div>
        <div className="col-3">{conference.place}</div>
        <div className="col-3">
          <b>Даты проведения: </b>
        </div>
        <div className="col-3">
          {conference.start_date.slice(0, 10)}{' '}
          {conference.end_date.slice(0, 10)}
        </div>
      </div>
      <div className="row" style={{ marginBottom: '20px' }}>
        <div className="col-3">
          <b>Цели: </b>
        </div>
        <div className="col-9">{conference.purposes}</div>
      </div>
      <div className="row" style={{ marginBottom: '20px' }}>
        <div className="col-3">
          <b>Тематика: </b>
        </div>
        <div className="col-9">{conference.theme}</div>
      </div>
      <div className="row" style={{ marginBottom: '20px' }}>
        <div className="col-3">
          <b>Программа: </b>
        </div>
        <div className="col-9">{conference.program}</div>
      </div>
      <div className="row" style={{ marginBottom: '20px' }}>
        <div className="col-3">
          <b>Рабочие языки: </b>
        </div>
        <div className="col-9">{conference.languages}</div>
      </div>
      <div className="row" style={{ marginBottom: '20px' }}>
        <div className="col-3">
          <b>Важные даты: </b>
        </div>
        <div className="col-9">{conference.dates}</div>
      </div>
      <div className="row" style={{ marginBottom: '20px' }}>
        <div className="col-3">
          <b>Публикация: </b>
        </div>
        <div className="col-9">{conference.publish_info}</div>
      </div>
      <div className="row" style={{ marginBottom: '20px' }}>
        <div className="col-3">
          <b>Партнеры: </b>
        </div>
        <div className="col-9">{'Партнер 1, Партнер 2'}</div>
      </div>
      <div className="row" style={{ marginBottom: '20px' }}>
        <div className="col-3">
          <b>Организаторы: </b>
        </div>
        <div className="col-9">
          {'Организатор 1, Организатор 2, Организатор 3'}
        </div>
      </div>
      <div className="row" style={{ marginBottom: '20px' }}>
        <div className="col-3">
          <b>Спонсоры: </b>
        </div>
        <div className="col-9">{'Спонсор 1'}</div>
      </div>
    </div>
  );
};

export default MainPage;
