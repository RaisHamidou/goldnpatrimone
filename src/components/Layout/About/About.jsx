import CTA from '@/components/Elements/Buttons/CTA/CTA'
import React from 'react'
import Stats from '../Stats/Stats'
import AboutIntro from './AboutIntro/AboutIntro';
import AboutStats from './AboutStats/AboutStats';
import Services from './Services/Services';
import Approach from './Approach/Approach';
import AboutQuote from './AboutQuote/AboutQuote';

export default function About() {
    return (
    <main className="about-page">
      <AboutIntro/>
      <AboutStats />
      <Services />
      <Approach />
      <AboutQuote />
    </main>
  );
}
