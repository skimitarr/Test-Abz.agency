import Image from "next/image";
import { ScrollBtn } from "../ScrollBtn/ScrollBtn";
import "./style.css";

export function Hero() {

  return (
    <section className="hero">
      <div className="hero-wrapper flex">
        <h2 className="hero-title">Test assignment for front-end developer</h2>
        <p className="hero-desc">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
        <ScrollBtn id='POST-request' text={'Sign up'} />
      </div>

      <Image
        src="/hero.jpeg"
        alt="background photo"
        fill
        priority
        className='hero-image'
      />
    </section>
  )
}
