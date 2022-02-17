import { useState, useEffect } from 'react';
import { getUser } from './services/fetch-utils';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthPage from './AuthPage';
import { logout } from './services/fetch-utils';
import ListPage from './ListPage';

import './App.css';

export default function App() {
  // track the user in state
  const [user, setUser] = useState(localStorage.getItem('supabase.auth.token'));

  // add a useEffect to get the user and inject the user object into state on load
  useEffect(() => {
    const data = getUser();
    setUser(data);
  }, [user]);

  async function handleLogout() {
    // call the logout function
    await logout();
    setUser('');
    // clear the user in state
  }

  return (
    <Router>
      <div className='App'>
        <header>
          {/* if there's a user, render a logout button here */}
          {
            user
              && <button onClick={handleLogout}>Logout</button>
          }
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              {/* if there is a user, redirect to the list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
              {
                user
                  ? <Redirect to='/shopping-list' />
                  : <AuthPage setUser={setUser} />
              }
            </Route>
            <Route exact path="/shopping-list">
              {/* if there's a user, take them to the list page. Otherwise, redirect them to the home/auth page */}
              {
                user
                  ? <ListPage />
                  : <Redirect to='/' />
              }

            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );}