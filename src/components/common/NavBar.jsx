import { NavLink, Link } from "react-router-dom";
import "../../App.css";
import { useAuth } from "../../context/auth.context";

const NavBar = () => {
  const { user } = useAuth();
  return (
    <>
      <nav
        className='navbar navbar-expand-sm navbar-dark  shadow-sm NAVBAR'
        aria-label='Third navbar example'
      >
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            Great <i className='bi bi-book'></i> Library
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarsExample03'
            aria-controls='navbarsExample03'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarsExample03'>
            <ul className='navbar-nav me-auto mb-2 mb-sm-0'>
              <li className='nav-item'>
                <NavLink to='about' className='nav-link'>
                  About
                </NavLink>
              </li>
              {user?.biz && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='my-cards'>
                    My Cards
                  </NavLink>
                </li>
              )}
            </ul>

            <ul className='navbar-nav ms-auto mb-2 mb-sm-0'>
              {user ? (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='signout'>
                    Sign out
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='SignIn'>
                      Sign In
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='SignUp'>
                      Sign Up
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='signUpBiz'>
                      Sign Up Business
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
