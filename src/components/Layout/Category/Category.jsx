import CategoryCards from '@/components/Elements/Cards/CategoryCards/CategoryCards'
import React from 'react'
import home from "../../../assets/svg/home.svg"
import invest from "../../../assets/svg/invest.svg"

export default function Category() {
  return (
    <div>
    <div className="container-category-card">
    <CategoryCards title={"Habiter"} btn={"Nos offres"} img={home}>
        Trouvez le logement idéal pour construire votre avenir en toute sérénité.
    </CategoryCards>
     <CategoryCards title={"Investir"} btn={"Nos offres"} img={invest}>
       Développez votre patrimoine grâce à des opportunités immobilières soigneusement sélectionnées.
    </CategoryCards>
    </div>
        
    </div>
  )
}
