import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContextProvider } from './context/ToastContext';
import CreateContact from './Pages/CreateContact';
import MyContacts from './Pages/MyContacts';
import EditContact from './Pages/EditContact';

function App() {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<CreateContact />} />
            <Route path='/mycontacts' element={<MyContacts />} />
            <Route path='/edit/:id' element={<EditContact />} />
          </Routes>
        </Layout>
      </AuthContextProvider>
    </ToastContextProvider>
  );
};

export default App;
