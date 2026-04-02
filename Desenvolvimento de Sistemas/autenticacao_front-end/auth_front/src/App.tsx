import axios from 'axios'
import { useState } from 'react'

function App() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [dataLogin, setDataLogin] = useState(null)
  const [dataCadastro, setDataCadastro] = useState()

  const cadastrar = async () => {
    try {
      const response = await axios.post("http://localhost:3000/cadastro", {
        email,
        senha
      })
      if (response?.data) {
        setDataCadastro(false)
      }
    } catch (error) {
      console.log(error)
      alert("Erro ao fazer o cadastro, verifique suas credenciais!")
    }

  }

  const logar = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        senha
      })
      if (response?.data) {
        setDataLogin(response.data)
      }
    } catch (error) {
      console.log(error)
      alert("Erro ao fazer o login, verifique suas credenciais!")
    }

  }
  return (
    <>
  
      {dataLogin !== null ? (
        <div className='flex flex-col bg-gray-100 w-full pt-32 items-center h-screen'>
          <h1 className='text-2xl font-semibold text-white'>Seja bem-vindo fulaninho</h1>
          <button className='bg-red-800 px-5 py-2 text-white rounded-2xl' onClick={() => setDataLogin(null)}>Sair</button>
        </div>
      ) : dataCadastro ? (< div className='flex flex-col <bg-gray-100></bg-gray-100> w-full justify-center items-center h-screen'>
          <form className='flex  gap-2 w-full flex-col items-center justify-center'>
            <label htmlFor="email">Email</label>

            <input className='border-2 border-grey rounded-1xl' type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="" />

            <label htmlFor="password">Senha</label>

            <input className='border-2 border-grey rounded-1xl' type="password" onChange={(e) => setSenha(e.target.value)} name="password" id="" />
          </form>
          <button onClick={cadastrar} className='bg-gray-800 px-5 py-2 text-white rounded-2xl'>Cadastrar</button>
          
        </div>) : (
        <div className='flex flex-col bg-gray-100 w-full justify-center items-center h-screen'>
          <form className='flex  gap-2 w-full flex-col items-center justify-center'>
            <label htmlFor="email">Email</label>

            <input className='border-2 border-grey rounded-1x1' type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="" />

            <label htmlFor="password">Senha</label>

            <input className='border-2 border-grey rounded-1x1' type="password" onChange={(e) => setSenha(e.target.value)} name="password" id="" />
          </form>
          <button onClick={logar} className='bg-gray-800 px-5 py-2 text-white rounded-2xl'>Login</button>
          <button onClick={()=>{setDataCadastro(true)}} className='bg-gray-800 px-5 py-2 text-white rounded-2xl'>cadastrar</button>

        </div >
      )
      }
      


    </>
  )
}

export default App