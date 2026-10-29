import CTA from '@/components/Elements/Buttons/CTA/CTA';
import React from 'react';
import img from "../../../assets/hero/AC05F7FC-77B3-420B-BAAD-1EA7523E7120.png"
import HousingIntro from './HousingIntro/HousingIntro';
import Steps from './Steps/Steps';
import Benefits from './Benefits/Benefits';
import Simulator from './Simulator/Simulator';
import HousingClosing from './HousingClosing/HousingClosing';



const Habiter = () => {
  return (
    <main className="habiter-page">
      <HousingIntro />
      <Steps />
      <Benefits />
      <Simulator />
      <HousingClosing />
    </main>
  );
};

export default Habiter;