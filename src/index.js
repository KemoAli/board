import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Note from './Note';
import Board from './Board'
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<Note />, document.getElementById('root'));
ReactDOM.render(<Board count ={500}/>, document.getElementById('root'))
registerServiceWorker();
