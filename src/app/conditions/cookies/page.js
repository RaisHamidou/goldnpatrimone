import Footer from '@/components/Layout/Footer/Footer'
import Header from '@/components/Layout/Header/Header'
import Cookies from '@/components/Layout/Legal/Cookies'
import React from 'react'

export default function page() {
  return (
    <div>
    <Header/>
        <Cookies/>
        <Footer/>
    </div>
  )
}
