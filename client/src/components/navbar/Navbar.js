import React, { Fragment, useState, useEffect } from 'react'
import { withRouter, NavLink, Link } from 'react-router-dom'
import '../../styles/nav.css'
import { signOut, getAuth } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import firebaseApp from '../../firebase'

firebaseApp()

const Navbar = () => {
  const auth = getAuth()
  const [click, setClick] = useState(false)
  const [navbar, setNavbar] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  let { user } = useSelector((state) => ({ ...state }))

  let dispatch = useDispatch()
  let history = useHistory()
  const logout = () => {
    signOut(auth)
    dispatch({
      type: 'LOGOUT',
      payload: null,
    })
    history.push('/signin')
  }

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarBackgroundColor)
  }, [])

  const changeNavbarBackgroundColor = () => {
    // console.log(window.scrollY)
    if(window.scrollY >= 80){
      setNavbar(true)
    }else{
      setNavbar(false)
    }
  }

 
  return (
    <>
      <nav className={navbar ? 'navbar change' : 'navbar md-shadow'}>
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <div className="logo">
              <img src="../../../img/kofi.png" alt="" />
            </div>
          </NavLink>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-links"
                onClick={closeMobileMenu}
                exact={true}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/products"
                className="nav-links"
                onClick={closeMobileMenu}
                exact={true}
              >
                products
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                contact
              </NavLink>
            </li>

            <div className="user">
              <Fragment>
                {!user && (
                  <li className="nav-item">
                    <NavLink
                      to="/signin"
                      className="user-reg"
                      onClick={closeMobileMenu}
                    >
                      sign in
                    </NavLink>
                  </li>
                )}

                {user && user.role === 'subscriber' && (
                  <li className="nav-item">
                    <NavLink
                      to="/user/history"
                      className="user-reg"
                      onClick={closeMobileMenu}
                    >
                      user page
                    </NavLink>
                  </li>
                )}

                {user && user.role === 'admin' && (
                  <li className="nav-item">
                    <NavLink
                      to="/admin/dashboard"
                      className="user-reg"
                      onClick={closeMobileMenu}
                    >
                      admin page
                    </NavLink>
                  </li>
                )}

                {!user && (
                  <li className="nav-item">
                    <NavLink
                      className="user-reg"
                      to="/signup"
                      onClick={closeMobileMenu}
                    >
                      sign up
                    </NavLink>
                  </li>
                )}

                {user && (
                  <>
                  <li className="nav-item" onClick={closeMobileMenu}>
                    <Link className="user-logout" to="/logout" onClick={logout}>
                      logout: {user.email && user.email.split('@')[0]}
                    </Link>
                  </li>
                  
                  </>
                )}
              </Fragment>
            </div>

            <li className="nav-item">
              <Link to="/cart" className="nav-links" onClick={closeMobileMenu}>
                Cart{' '}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
export default withRouter(Navbar)
