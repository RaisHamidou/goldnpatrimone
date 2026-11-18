import Footer from '@/components/Layout/Footer/Footer'
import Header from '@/components/Layout/Header/Header'
import CGU from '@/components/Layout/Legal/CGU'
import MentionsLegales from '@/components/Layout/Legal/MentionsLegales'
import React from 'react'

export default function page() {
  return (
    <div>
        <Header/>
        <MentionsLegales/>
        <Footer/>
    </div>
  )
}
