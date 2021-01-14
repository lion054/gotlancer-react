import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import 'material-ui-phone-number/src/styles.less';
import 'material-ui-phone-number/src/flags.png';

import './App.css';

import store from './controllers/store';
import Content from './Content';

class App extends PureComponent {
  render = () => (
    <Provider store={store}>
      <Content />
    </Provider>
  )
}

export default App;