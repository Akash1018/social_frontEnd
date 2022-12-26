import React from 'react';
import { Container} from '@material-ui/core';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './component/Home/Home';
import Navbar from './component/Navbar/Navbar';
import Auth from './component/Auth/Auth';
import PostDetails from './component/PostDetails/PostDetails';

const App =() => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
      <BrowserRouter>
        <Container maxidth="xl">
            <Navbar />
            <Switch>
                <Route path='/' exact component={() => <Redirect to='/posts' />} />
                <Route path='/posts' exact component={Home}/>
                <Route path='/posts/search' exact component={Home}/>
                <Route path='/posts/:id' component={PostDetails}/>
                <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to="/posts"/>)} />
            </Switch>
        </Container>
       </BrowserRouter>  
    )
}

export default App;