import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import Admin from './Components/Admin/Admin';
import Blog from './Components/Blog/Blog';
import HomePage from './Components/Home/HomePage';
import Login from './Components/Auth/Login';
import DetailDoctor from './Components/Home/ContentHompage/DetaiDoctor';
import ManageDoctorSchedule from './Components/Admin/Content/DoctorSchedule/ManageDoctorSchedule';
import ManageUser from './Components/Admin/Content/ManageUser';
import NotFound from './Components/Home/ContentHompage/NotFound';
import DashBoard from './Components/Admin/Content/DashBoard';
import VerifyEmail from './Components/Auth/VerifyEmail';
import AddNewSpecialty from './Components/Admin/Content/AddNewSpecialty';
import DetailSpecialty from './Components/Home/ContentHompage/DetailSpecialty';
import DetailClinic from './Components/Home/ContentHompage/DetailClinic';
import ManagePatient from './Components/Home/ContentHompage/ManagePatient';
// import ManageBlog from './Components/Admin/Content/ManageBlog';  
import BlogDetail from './Components/Blog/BlogDetail';
import AddNewClinic from './Components/Admin/Content/AddNewClinic';
import 'react-toastify/dist/ReactToastify.css';
import 'react-awesome-lightbox/build/style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'nprogress/nprogress.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toggle/style.css"
import AddNewBlog from './Components/Admin/Content/AddNewBlog';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} >
            <Route index element={<HomePage />} />
            <Route path='/blog' element={<Blog />} />
          </Route>

          <Route path='/admin' element={<Admin />}>
            <Route index element={<DashBoard />} />
            <Route path='manage-user' element={<ManageUser />} />
            <Route path='manage-schedule' element={<ManageDoctorSchedule />} />
            <Route path='manage-specialty' element={<AddNewSpecialty />} />
            <Route path='manage-clinic' element={<AddNewClinic />} />
            <Route path='manage-patient' element={<ManagePatient />} />
            <Route path='manage-blog' element={<AddNewBlog />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/detail-doctor/:id' element={<DetailDoctor />} />
          <Route path='/detail-specialty/:id' element={<DetailSpecialty />} />
          <Route path='/detail-clinic/:id' element={<DetailClinic />} />
          <Route path='/detail-blog/:id' element={<BlogDetail />} />
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
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
