import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useAuth } from '../../contexts/AuthContext'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const { login } = useAuth()

  // validação de login
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      // Consulta o json-server para encontrar o usuário
      const response = await axios.get('http://localhost:3000/users', { params: { email, password } })

      const users = response.data

      if (!Array.isArray(users) || users.length === 0) {
        toast.error('Email ou senha inválidos', {
          autoClose: 3000,
          hideProgressBar: true
        })
        return
      }

      // Autentica com o email do primeiro usuário encontrado
      const user = users[0]
      if (typeof login === 'function') login(user.email)

      toast.success('Login realizado com sucesso!', {
        autoClose: 3000,
        hideProgressBar: true
      })

      navigate('/dashboard')

    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Erro ao conectar com o servidor'
      toast.error(`Erro ao efetuar login: ${msg}`, {
        autoClose: 4000,
        hideProgressBar: true
      })
      console.error('Login error:', error)
    }
  }

  return (
    <div className='max-w-md mx-auto mt-10 bg-white p-8 border rounded-xl shadow-lg '>
      <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>

      <form onSubmit={handleLogin} className='space-y-4'>

        <fieldset>
          <label htmlFor="email" className='block text-sm font-medium mb-1'>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            value={email}
            required
            className='w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500'
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password" className=''>Senha</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            id="password"
            value={password}
            required
            className='w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500'
          />

        </fieldset>

        <button
          type='submit'
          className='w-full bg-cyan-700 text-white p-2 rounded-lg hover:bg-cyan-800 transition-colors cursor-pointer'
        >Entrar</button>
      </form>
    </div>
  )
}

export default LoginForm
