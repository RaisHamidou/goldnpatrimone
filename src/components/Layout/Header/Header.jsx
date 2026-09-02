"use client"
import React, {useState, useEffect} from 'react'
import Logo from "../../../assets/logo/logo.png"
import { usePathname } from 'next/navigation'
import { FaBars, FaXmark } from "react-icons/fa6";

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/habiter", label: "Habiter" },
    { href: "/investire", label: "Investire" },
 
    { href: "/a-propos", label: "À propos" },
  ]

  useEffect(() => {
    if(open){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflow = "inherit"
    }
    
  }, [open]);
  return (
    <header>
   
      <div className="logo"><a href="/"><img src={Logo.src} alt="" /></a></div>
       <div className="open">
      {!open ?<FaBars className='icon' onClick={() => setOpen(!open)}/> : <FaXmark className='icon' onClick={() => setOpen(!open)}/>  }
    </div>
      
      <nav className={open ? "show":""}>
        <ul>
        {links.map((link)=>(
          <li key={link.label} className={pathname == link.href?"active":""}><a href={link.href}>{link.label}</a></li>
        ))}
        <a className='btn-full mobile-btn' href='/contact'>Contact</a>
        </ul>
      </nav>
      <a className='btn-full desktop-btn' href='/contact'>Contact</a>
    </header>
  )
}
