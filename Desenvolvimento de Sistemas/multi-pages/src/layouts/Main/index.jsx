import React from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { Outlet } from 'react-router'

export const Main = () => {
  return (
    <div className='flex min-h-screen flex-col'>
        <Header />
            <main className='flex-1 contaiener mx-auto'>
                <Outlet />
            </main>

        <Footer />
    </div>
  )
}
