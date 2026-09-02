import React from 'react'
import CTA from '../../Buttons/CTA/CTA'
import home from "../../../../assets/svg/home.svg"
export default function CategoryCards({title, children, btn, img}) {
  return (
    <div className='Category-cards'>
      <div className="title-category">
      <div className="icon-category">
        <img src={img.src} alt="" />
      </div>
      
      <h2>{title}</h2>
      </div>
      <p className="desc-category-card">{children}</p>
      <CTA variant="outline">
      {btn}
      </CTA>
    </div>
  )
}
