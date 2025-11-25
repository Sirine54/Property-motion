import { Navbar } from '../features/HomeBlocks/Navbar';
import InfoComp from '@/features/HomeBlocks/InfoComp';
import Footer from '@/features/HomeBlocks/Footer';

const Home = () => {
  return (
    <div
      className="w-full h-screen flex flex-col relative gap-40
       px-[clamp(1rem,7vw,7rem)]
                py-[clamp(1rem,2.5vw,2.5rem)]
    "
    >
      <Navbar />
      <InfoComp />
      <Footer />
    </div>
  );
};

export default Home;
