import React from 'react';
import { ajax } from './utils';

class Debug extends React.Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <button
          onClick={() =>
            ajax('/conferences/get_all').then(data =>
              console.log(JSON.parse(data))
            )
          }>
          get
        </button>
        <button
          onClick={() =>
            ajax('/conferences/create', {
              // id: 1,
              short_name: 'конф 3'
              // full_name: 'Тестовая конференция 2',
              // place: 'Москва',
              // start_date: '11.03.2018',
              // end_date: '15.03.2018',
              // logo: '',
              // purposes:
              //   'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              // theme: 'Исследования в области тестов, тестирование',
              // program:
              //   'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              // languages: 'Russian, English',
              // dates: 'Регистрация 15.11.2017\nПубликация 15.12.2017',
              // publish_info: 'Информация о публикации конференции 2',
              // contributions:
              //   'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              // cooperative_events: [],
              // program_committee: [1, 2, 3],
              // org_committee: [1, 2],
              // org_contacts: [1],
              // partners: [1, 2],
              // organizers: [3, 4],
              // sponsors: [5],
              // pages: []
            })
          }>
          create
        </button>
        <button
          onClick={() =>
            ajax('/conferences/update', {
              id: 1,
              // short_name: 'Тест 1'
              // full_name: 'Тестовая конференция',
              // place: 'Томск',
              start_date: '01.02.2018',
              end_date: '05.02.2018',
              // logo: '',
              // purposes:
              //   'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              // theme: 'Исследования в области тестов, тестирование',
              // program:
              //   'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              // languages: 'Russian, English',
              // dates: 'Регистрация 15.10.2017\nПубликация 15.11.2017',
              // publish_info: 'Информация о публикации'
              // contributions:
              //   'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              // cooperative_events: [],
              program_committee: [1, 2, 3],
              org_committee: [1, 2],
              org_contacts: [1],
              partners: [1, 2],
              organizers: [3, 4],
              sponsors: [5],
              pages: []
            })
          }>
          update
        </button>
      </div>
    );
  }
}

export default Debug;
