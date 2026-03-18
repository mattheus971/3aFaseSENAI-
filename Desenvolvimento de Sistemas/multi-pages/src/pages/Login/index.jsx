import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router'


export const Login = () => {

    const [email, setEmail] = useState("")
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email)
        navigate("/")
    }

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <form onSubmit={handleSubmit} className='p-6 border rounded space-y-4'>

                <h2 className='text-xl font-bold '>Login</h2>

                <input type="email"
                    placeholder='Digite seu email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='w-full px-3 py-2 border rounded'
                />

                <button type='submit' className=' w-full bg-emerald-400 text-white py-2 rounded hover:bg-emerald-400 '>Entrar</button>

            </form>
        </div>
    )
}
