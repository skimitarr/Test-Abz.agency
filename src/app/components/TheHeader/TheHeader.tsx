import Image from "next/image";
import { ScrollBtn } from "../ScrollBtn/ScrollBtn";
import "./style.css";

export function TheHeader() {
  return (
    <div className='flex header global-pad'>
      <Image
        src="/Logo.svg"
        alt="logo"
        width={104}
        height={26}
        className='header-image'
      />
      <div>
        <ScrollBtn id='GET-request' text={'Users'} />
        <ScrollBtn id='POST-request' text={'Sign up'} />
      </div>
    </div>
  )
}
