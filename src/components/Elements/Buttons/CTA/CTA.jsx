import React from 'react'

export default function CTA({children, variant}) {
  return (
    <a className={variant == "filled" ? "btn-filled": "btn-outline"}>
    {children}
    </a>
  )
}
