import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root.jsx';
import ErrorPage from './error-page.jsx';
import { DashBoard } from './components/DashBoard';
import Tablecp from './table/Table.jsx';
import AddItemTable from './table/AddItemTable';

import store from './store';
import { Provider } from 'react-redux';
import EditContact from './routes/contact.jsx';
import RequireAuth from './auth/RequireAuth';
import {fakeAuthProvider} from './auth/auth';
import RegisterAndLogin from './auth/RegisterAndLogin';
import User from './user/user.jsx';

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: 'login',
    element: <RegisterAndLogin />
  },
  {
    path: "/",
    element: 
     <RequireAuth>
      <Root />
     </RequireAuth>
    ,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "DashBoard",
        element: <DashBoard />,
      },
      {
        path: "Contact",
        element: <EditContact />,
      },
      {
        path: "Table",
        element: <Tablecp />,
      },
      {
        path: "addItemTable",
        element: <AddItemTable />
      },
      {
        path: "ListUser",
        element: <User/>,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      {/* children */}
      <Provider store={store}>
        <RouterProvider router={router} />
        
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
)

let AuthContext = React.createContext(null);

export const useAuth = () => {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }) {

  // user kieem tra xem nguoi dung login chua
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      // signin with email/pass
      if(newUser._tokenResponse){
        setUser(newUser.user.email);
        // token get from freibase
        localStorage.setItem('tokenUser', newUser._tokenResponse.idToken);
        // user get from freibase
        localStorage.setItem('user', newUser.user.email);
      }else {
      // sign in with google
      setUser(newUser.email);
      localStorage.setItem('tokenUser', newUser.token);
        // user get from freibase
        localStorage.setItem('user', newUser.email);
      }

      
      callback("/DashBoard", {replace : true});
    });
  };

  let callbackUrl= (callback) => {
      callback;
  }

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      localStorage.clear();
      callback;
    });
  };

  let value = { user, signin, signout, callbackUrl, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
