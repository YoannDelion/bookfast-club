import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom'
import BooksPage from './pages/BooksPage'
import ScoresPage from './pages/ScoresPage'
import LoginPage from './pages/LoginPage'
import SigninPage from './pages/SigninPage'
import PrivateRoute from './components/PrivateRoute'
import AuthAPI from './services/authAPI'
import AuthContext from './contexts/AuthContext'
import BookPage from './pages/BookPage'
import ScorePage from './pages/ScorePage'
import { ToastContainer, toast } from 'react-toastify'

import '../css/app.css'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import store from './store'

AuthAPI.setup()

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated)

    const NavbarWithRouter = withRouter(Navbar)

    return (
      <Provider store={store}>
          <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
              <HashRouter>
                  <NavbarWithRouter/>
                  <main className="container pt-5">
                      <Switch>
                          <Route path={'/login'} component={LoginPage}/>
                          <Route path={'/signin'} component={SigninPage}/>
                          <PrivateRoute path={'/books/:id'} component={BookPage}/>
                          <PrivateRoute path={'/books'} component={BooksPage}/>
                          <PrivateRoute path={'/scores/:id'} component={ScorePage}/>
                          <PrivateRoute path={'/scores'} component={ScoresPage}/>
                          <Route path={'/'} component={HomePage}/>
                      </Switch>
                  </main>
              </HashRouter>
              <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
          </AuthContext.Provider>
      </Provider>
    )
}

ReactDOM.render(
  <App/>
  , document.getElementById('app'))