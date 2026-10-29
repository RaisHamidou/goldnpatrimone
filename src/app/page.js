import CTA from "@/components/Elements/Buttons/CTA/CTA";
import About from "@/components/Layout/AboutHome/AboutHome";
import Category from "@/components/Layout/Category/Category";
import ContactBanner from "@/components/Layout/ContactBanner/ContactBanner";
import Footer from "@/components/Layout/Footer/Footer";
import Header from "@/components/Layout/Header/Header";
import Hero from "@/components/Layout/Hero/Hero";
import Intro from "@/components/Layout/Intro/Intro";
import Offer from "@/components/Layout/Offer/Offer";
import Partner from "@/components/Layout/Partner/Partner";
import Preview from "@/components/Layout/Preview/Preview";
import Stats from "@/components/Layout/Stats/Stats";
import Testimonials from "@/components/Layout/Testimonials/Testimonials";
import Why from "@/components/Layout/Why/Why";

export default function Home() {
  return (
     <main className="goldn-page">
     <Hero>
        <h1>Construisons votre projet de vie ensemble !</h1>
        <p>
          Votre projet, notre expertise ! Chez GOLD’N PATRIMOINE 
          nous proposons des biens soigneusement sélectionnés aux meilleurs prix, avec un accompagnement clé en main.
        </p>
        <div className="container-buttons">
          <CTA href={"#nos-solutions"} variant="filled">Découvrir</CTA>
        </div>
      </Hero>
      <Partner />
      <Intro />
      <Why />
      <Stats />
      <About />
      <Testimonials />
      

       <Footer />
    </main>
  );
}
