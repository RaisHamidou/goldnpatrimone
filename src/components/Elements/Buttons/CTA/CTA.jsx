import React from 'react'

export default function CTA({children, variant, href}) {
  return (
    <a href={href} className={variant == "filled" ? "btn-filled": "btn-outline"}>
    {children}
    </a>
  )
}
