import Image from "next/image";
import "./style.css";

type Props = {
  isRegistered: boolean | null
};

export function SuccessfullRegistration({ isRegistered }: Props) {

  return (
    isRegistered &&
    <section className="registered">
      <h2 className="title">User successfully registered</h2>

      <Image
        src="/success-image.svg"
        alt="picture for successfull registration"
        className='success-image'
        width={328}
        height={290}
        onLoad={() => {
          if (isRegistered) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }
        }}
      />
    </section>
  )
}
