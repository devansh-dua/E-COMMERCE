import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
    </nav>
  )
}

export default Navbar