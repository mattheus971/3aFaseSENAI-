import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'

export const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className='flex items-center justify-between p-4 bg-gray-300'>
      <nav className='space-x-4'>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "text-emerald-600 font-bold" : "text-gray-700"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/sobre"
          end
          className={({ isActive }) =>
            isActive ? "text-emerald-600 font-bold" : "text-gray-700"
          }
        >
          Sobre
        </NavLink>

        <NavLink
          to="/blog"
          end
          className={({ isActive }) =>
            isActive ? "text-emerald-600 font-bold" : "text-gray-700"
          }
        >
          Blog
        </NavLink>
      </nav>

      <div>
        {user ? (
          <>
            <span className='mr-4'>Olá, {user.email}</span>
            <button onClick={handleLogout} className='bg-red-600 text-white px-3 py-1 rounded'>Logout</button>
          </>
        ) : (
          <NavLink to="/login" className="bg-blue-600 text-white px-3 py-1 rounded">
            Login
          </NavLink>
        )}
      </div>

    </header>
  )
}
