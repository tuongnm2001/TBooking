import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './redux/store';
import Admin from './Components/Admin/Admin';
import User from './Components/User/User';
import HomePage from './Components/Home/HomePage';
import Login from './Components/Auth/Login';
import DetailDoctor from './Components/Home/ContentHompage/DetaiDoctor';
import ManageDoctorSchedule from './Components/Admin/Content/DoctorSchedule/ManageDoctorSchedule';
import ManageUser from './Components/Admin/Content/ManageUser';
import NotFound from './Components/Home/ContentHompage/NotFound';
import DashBoard from './Components/Admin/Content/DashBoard';
import VerifyEmail from './Components/Auth/VerifyEmail';
import ManageSpecialty from './Components/Admin/Content/ManageSpecialty';
import ManageClinic from './Components/Admin/Content/ManageClinic';
import DetailSpecialty from './Components/Home/ContentHompage/DetailSpecialty';
import 'react-toastify/dist/ReactToastify.css';
import 'react-awesome-lightbox/build/style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'nprogress/nprogress.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route index element={<HomePage />} />
          <Route path='/user' element={<User />} />
        </Route>

        <Route path='/admin' element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path='manage-user' element={<ManageUser />} />
          <Route path='manage-schedule' element={<ManageDoctorSchedule />} />
          <Route path='manage-specialty' element={<ManageSpecialty />} />
          <Route path='manage-clinic' element={<ManageClinic />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/detail-doctor/:id' element={<DetailDoctor />} />
        <Route path='/detail-specialty/:id' element={<DetailSpecialty />} />
        <Route path='/verify-booking' element={<VerifyEmail />} />
        <Route path='*' element={<NotFound />} />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
