import React from 'react';
import { Link } from 'react-router-dom';
import { ajax } from './utils';

class ConferenceEditor extends React.Component {
  state = {
    id: 0,
    short_name: '',
    full_name: '',
    place: '',
    start_date: '',
    end_date: '',
    logo: '',
    purposes: '',
    theme: '',
    program: '',
    languages: '',
    dates: '',
    publish_info: '',
    contributions: '',
    cooperative_events: [],
    program_committee: [],
    org_committee: [],
    org_contacts: [],
    partners: [],
    organizers: [],
    sponsors: [],
    pages: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { conference } = nextProps;
    if (conference && JSON.stringify(conference) !== JSON.stringify(prevState))
      return { ...conference };
    return null;
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    let data = {};
    // for (key in this.state)
    const url =
      this.state.id === 0 ? '/conferences/create' : '/conferences/update';
    ajax(url, this.state).then(response => {
      console.log(response);
      this.props.onUpdate();
    });
    alert(
      this.state.id === 0
        ? 'Конференция успешно создана'
        : 'Конференция успешно отредактирована'
    );
  };

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label">Краткое название</label>
            <div className="col-lg-10">
              <input
                name="short_name"
                type="text"
                value={this.state.short_name}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Краткое название"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label">Полное название</label>
            <div className="col-lg-10">
              <input
                name="full_name"
                type="text"
                value={this.state.full_name}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Полное название"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label">Место проведения</label>
            <div className="col-lg-10">
              <input
                name="place"
                type="text"
                value={this.state.place}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Место проведения"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label">Даты проведения</label>
            <div className="col-lg-5">
              <input
                name="start_date"
                type="date"
                value={this.state.start_date}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-lg-5">
              <input
                name="end_date"
                type="date"
                value={this.state.end_date}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label">Логотип</label>
            <div className="col-lg-10">
              <input type="file" className="form-control" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label">Цели</label>
            <div className="col-lg-10">
              <textarea
                name="purposes"
                value={this.state.purposes}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label">Тематика</label>
            <div className="col-lg-10">
              <input
                name="theme"
                type="text"
                value={this.state.theme}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Тематика"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label">Программа</label>
            <div className="col-lg-10">
              <textarea
                name="program"
                value={this.state.program}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label">Рабочие языки</label>
            <div className="col-lg-10">
              <input
                name="languages"
                type="text"
                value={this.state.languages}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Рабочие языки"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label">Важные даты</label>
            <div className="col-lg-10">
              <textarea
                name="dates"
                value={this.state.dates}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label">
              Информация о публикации
            </label>
            <div className="col-lg-10">
              <textarea
                name="publish_info"
                value={this.state.publish_info}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label">
              Организационные взносы
            </label>
            <div className="col-lg-10">
              <textarea
                name="contributions"
                value={this.state.contributions}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          <Link
            to="/management"
            onClick={this.handleSubmit}
            className="btn btn-primary">
            {this.state.id !== 0 ? 'Сохранить' : 'Создать'}
          </Link>
        </form>
      </div>
    );
  }
}

export default ConferenceEditor;
