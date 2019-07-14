import React, { Component } from 'react'
import { BrowserRouter, HashRouter, Route ,Switch} from 'react-router-dom'
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'
export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch> {/*只匹配其中一个*/}
                    <Route path='/' component={Login}></Route>
                    <Route path='/Admin' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
