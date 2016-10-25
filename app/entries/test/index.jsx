import './index.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import { browserHistory } from 'react-router';
import Routes from '../../routes/index';
import 'antd/dist/antd.css';

ReactDOM.render(<Routes history={browserHistory} />, document.getElementById('main-container'));
