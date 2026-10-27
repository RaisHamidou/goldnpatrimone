import CTA from "@/components/Elements/Buttons/CTA/CTA";
import Category from "@/components/Layout/Category/Category";
import Footer from "@/components/Layout/Footer/Footer";
import Header from "@/components/Layout/Header/Header";
import Hero from "@/components/Layout/Hero/Hero";
import Offer from "@/components/Layout/Offer/Offer";
import Partner from "@/components/Layout/Partner/Partner";
import Preview from "@/components/Layout/Preview/Preview";
import Stats from "@/components/Layout/Stats/Stats";

export default function Home() {
  return (
    <div>
      <Hero>
        <h1>Construisons votre projet de vie ensemble !</h1>
        <p>
          Votre projet, notre expertise ! Chez GOLD’N PATRIMOINE 
          nous proposons des biens soigneusement sélectionnés aux meilleurs prix, avec un accompagnement clé en main.
        </p>
        <div className="container-buttons">
          <CTA variant="filled">Découvrir</CTA>
        </div>
      </Hero>
       <Partner />
     
      
       <Category />
   {/*    <Offer /> */}
   <Stats />
     
     
      <Preview />
     
      <Footer />
    </div>
  );
}
