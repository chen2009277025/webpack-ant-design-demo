/**
 * Created by chenjianhui on 16/9/29.
 */
import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import Index from '../components/Index';
import Blog from '../components/Blog';
import NotFound from  '../components/NotFound';

const Routes = ({ history }) =>
    <Router history={history}>
        <Route path="/test.html" component={Index} />
        <Route path="/blog" component={Blog} />
        <Route path="/about" component={Index} />
        <Route path="/404" component={NotFound} />
    </Router>;

Routes.propTypes = {
    history: PropTypes.any,
};

export default Routes;
