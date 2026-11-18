import Footer from '@/components/Layout/Footer/Footer'
import Header from '@/components/Layout/Header/Header'
import CGU from '@/components/Layout/Legal/CGU'
import React from 'react'

export default function page() {
  return (
    <div>
        <Header/>
        <CGU/>
        <Footer/>
    </div>
  )
}
