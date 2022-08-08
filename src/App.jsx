import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from "./components/HomePage";
import SignUp from "./components/sign-up";
import SignIn from "./components/sign-in";
import SignUpBiz from "./components/sign-up-biz";
import { Routes, Route } from "react-router-dom";
import CreateCard from "./components/common/CreateCard";
import MyCards from "./components/common/MyCards";
import Logout from "./components/common/Logout";
import DeleteCard from "./components/DeleteCard";
import EditCard from "./components/EditCard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/ProtrctrdRoute";

function App() {
  return (
    <div className='app d-flex flex-column min-vh-100'>
      <ToastContainer />
      <Header />
      <main className='container flex-fill'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/my-cards/create-card'
            element={
              <ProtectedRoute>
                <CreateCard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/my-cards'
            element={
              <ProtectedRoute>
                <MyCards />
              </ProtectedRoute>
            }
          />
          <Route
            path='/my-cards/delete/:id'
            element={
              <ProtectedRoute onlyBiz>
                <DeleteCard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/my-cards/edit/:id'
            element={
              <ProtectedRoute onlyBiz>
                <EditCard />
              </ProtectedRoute>
            }
          />
          <Route path='/SignUp' element={<SignUp redirect='/SignIn' />} />
          <Route path='/SignIn' element={<SignIn redirect='/' />} />
          <Route path='/signout' element={<Logout redirect='/' />} />
          <Route
            path='/signUpBiz'
            element={<SignUpBiz redirect='my-cards/create-card' />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
