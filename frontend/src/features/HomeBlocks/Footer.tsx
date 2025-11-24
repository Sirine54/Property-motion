import { Rating, RatingButton } from '../../components/ui/shadcn-io/rating';
import { TextAnimate } from '@/components/ui/text-animate';

const Footer = () => {
  return (
    <div
      className="fixed bottom-0 w-full left-0 right-0 bg-[#FAFCFE]
                flex flex-col md:flex-row
                items-center justify-between
                px-[clamp(1rem,7vw,7rem)]
                py-[clamp(1rem,2.5vw,2.5rem)]"
    >
      <div className="text-[clamp(1rem,2vw,32px)] flex font-bold  flex-col whitespace-nowrap justify-start items-start  ">
        <span className=" flex-wrap"> Trusted by more than 500 property </span>

        <TextAnimate animation="slideLeft" by="character" className="text-[#27C499] ml-2 ">
          professionals
        </TextAnimate>
      </div>
      <div
        className="flex  flex-1 flex-row justify-end space-x-7 
     
      "
      >
        {/* stars rating */}
        <div className="flex flex-col items-center gap-2">
          {/* <div className="flex flex-col items-center "> */}
          <Rating value={5} readOnly>
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton
                className="text-yellow-500 max-[800px]:h-3 max-[800px]:w-4 "
                size={20}
                key={index}
              />
            ))}
          </Rating>
          {/* </div> */}
          <span className="text-2xl font-medium text-[clamp(1rem,1.5vw,1.5rem)] ">
            <TextAnimate animation="slideUp" by="character">
              4.9/5 rating
            </TextAnimate>
          </span>
        </div>
        {/* delievery hours */}
        <div className="flex flex-col  text-[clamp(1rem,1.5vw,1.5rem)]">
          <span className="font-bold ">48hr</span>
          <span className="font-medium">delievery</span>
        </div>
        {/* coverage */}
        <div className="flex flex-col text-[clamp(1rem,1.5vw,1.5rem)]">
          <span className="font-bold">UK-wide</span>
          <span className="font-medium">coverage</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
