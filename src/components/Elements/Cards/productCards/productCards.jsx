import React from 'react'
import { LuMapPin } from "react-icons/lu";
import imgT from "../../../../assets/placeholder/pexels-doan-thanh-binh-2147604563-36887747.jpg"

export default function ProductCards({title, adresse, superficie, price, href}) {
  return (
    <a href='#' className='product-card'>
  <div className="container-product-card">
<div className="product-img">
  <img src={imgT.src} alt="" />
</div>
<div className="product-info">
  <div className="title-info">Résidence Horizon</div>
  <div className="superficie"><LuMapPin className='info-icon'/>Ile de france</div>
  <div className="superficie">Superficie : T2 </div>
  <div className="price">A partir de 450 000 €</div>
</div>
  </div>


    </a>
  )
}
