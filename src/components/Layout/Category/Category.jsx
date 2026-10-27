import CategoryCards from '@/components/Elements/Cards/CategoryCards/CategoryCards'
import React from 'react'
import home from "../../../assets/svg/home.svg"
import invest from "../../../assets/svg/invest.svg"

export default function Category() {
  return (
    <div>
     <h2 className="stats-title">Votre avenir commence ici</h2>
      <h3 className="stats-subtitle">Achetez votre futur logement, réalisez un investissement ou développez votre patrimoine grâce à des opportunités immobilières soigneusement sélectionnées.</h3>

    <div className="container-category-card">
    <CategoryCards title={"RESIDENCE PRINCIPALE"} btn={"En savoir plus"}  img={home}>
        Découvrez nos logements alliant confort moderne, performance énergétique et prestations de qualité, pensés pour votre quotidien et vos envies.
    </CategoryCards>
     <CategoryCards title={"INVESTISSEMENT LOCATIF "} btn={"En savoir plus"}  img={invest}>
      Optimisez votre fiscalité, préparez votre avenir et développez votre patrimoine grâce à des opportunités immobilières sélectionnés dans des emplacements à fort potentiel de valorisation.
    </CategoryCards>
    </div>
        
    </div>
  )
}
