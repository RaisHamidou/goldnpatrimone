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
        <h1>Construisons votre avenir immobilier</h1>
        <p>
          Découvrez une sélection de logements neufs et de biens soigneusement
          choisis pour répondre à tous vos projets.
        </p>
        <div className="container-buttons">
          <CTA variant="filled">Découvrire</CTA>
        </div>
      </Hero>
     
      <Stats />
       <Category />
   {/*    <Offer /> */}
      <Partner />
      <Preview />
      <Footer />
    </div>
  );
}
