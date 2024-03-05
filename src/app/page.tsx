import { Hero } from './components/Hero/Hero';
import { ListOfUser } from './components/ListOfUser/ListOfUser';
import { Form } from './components/Form/Form';

export default function Home() {
  return (
    <>
      <Hero />
      <ListOfUser />
      <Form />
    </>
  );
}
