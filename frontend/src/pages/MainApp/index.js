import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Footer, Header } from '../../components';
import CreateBlog from '../CreateBlog';
import DetailBlog from '../DetailBlog';
import Home from '../Home';
import './mainApp.scss';

const MainApp = () => {
    const token = localStorage.getItem('token')

    if (!token) {
        return <Redirect to='/login' />
    }
    return (
        <div className='main-app-wrapper'>
            <Header />
            <div className='content-wrapper'>
                <Router>
                    <Switch>
                        <Route path='/create-blog/:id?'>
                            <CreateBlog />
                        </Route>
                        <Route path='/detail-blog/:id'>
                            <DetailBlog />
                        </Route>
                        <Route path='/dashboard'>
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </div>
            <Footer />
        </div>
    )
}

export default MainApp