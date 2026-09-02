import React from "react";
import Marquee from "react-fast-marquee";
import { FaStar } from "react-icons/fa";


const reviews = [
  {
    id: 1,
    name: "John Doe",
    initials: "J.D",
    rating: 5,
    text: "Un accompagnement professionnel du début à la fin. L'équipe a su nous guider dans notre projet immobilier avec sérieux et réactivité. Nous avons trouvé un logement qui correspond parfaitement à nos attentes.",
  },
  {
    id: 2,
    name: "John Doe",
    initials: "J.D",
    rating: 5,
    text: "Un accompagnement professionnel du début à la fin. L'équipe a su nous guider dans notre projet immobilier avec sérieux et réactivité. Nous avons trouvé un logement qui correspond parfaitement à nos attentes.",
  },
  {
    id: 3,
    name: "John Doe",
    initials: "J.D",
    rating: 5,
    text: "Un accompagnement professionnel du début à la fin. L'équipe a su nous guider dans notre projet immobilier avec sérieux et réactivité. Nous avons trouvé un logement qui correspond parfaitement à nos attentes.",
  },
  {
    id: 4,
    name: "John Doe",
    initials: "J.D",
    rating: 5,
    text: "Un accompagnement professionnel du début à la fin. L'équipe a su nous guider dans notre projet immobilier avec sérieux et réactivité. Nous avons trouvé un logement qui correspond parfaitement à nos attentes.",
  },
];

const Review = () => {
  return (
    <section className="review">
      <div className="review__container">
        <h2 className="review__title">Ce qu’ils disent de nous</h2>

        <Marquee
          gradient={false}
          speed={32}
          pauseOnHover={true}
          className="review__marquee"
        >
          {reviews.map((item) => (
            <article className="review-card" key={item.id}>
              <div className="review-card__top">
                <div className="review-card__avatar">{item.initials}</div>

                <div className="review-card__meta">
                  <h3>{item.name}</h3>

                  <div
                    className="review-card__stars"
                    aria-label={`${item.rating} étoiles sur 5`}
                  >
                    {Array.from({ length: item.rating }).map((_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>
                </div>
              </div>

              <p className="review-card__text">{item.text}</p>
            </article>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Review;