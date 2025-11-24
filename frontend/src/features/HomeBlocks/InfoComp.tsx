import dashboard from '@/assets/dashboard.png';
import { TextAnimate } from '../../components/ui/text-animate';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../../components/ui/button';

const InfoComp = () => {
  return (
    <div
      className="
    flex items-start justify-between
    max-[800px]:flex-col max-[800px]:items-center max-[800px]:gap-6
    gap-8

    "
    >
      {/* left side */}
      <div className="flex flex-col items-start text-left flex-1 min-w-0">
        <span className="text-sm font-bold text-[#404059] ">WELCOME TO PROPERTY MOTION</span>

        <div className="font-extrabold mt-3">
          <h1 className="text-[clamp(1.6rem,3.6vw,3.5rem)] leading-[clamp(1.05,1.02vw,1.08)]">
            Market Faster,
          </h1>
          <h1 className="text-[clamp(1.6rem,3.6vw,3.5rem)] leading-[clamp(1.05,1.02vw,1.08)]">
            Stay Compliant,
          </h1>
          <h1 className="text-[#27C499] text-[clamp(1.6rem,3.6vw,3.5rem)] leading-[clamp(1.05,1.02vw,1.08)]">
            <TextAnimate animation="slideUp" by="word" duration={1}>
              Simplify Everything.
            </TextAnimate>
          </h1>
        </div>

        <div className="my-6">
          <p className="text-[#404059] font-medium leading-tight text-[clamp(0.95rem,1.4vw,1.125rem)] max-w-[70ch]">
            Property Motion is your centralised platform for property marketing and compliance. From
            professional photography and EPCs to branded brochures and landlord safety checks, we
            streamline everything, so you can focus on growth.
          </p>
        </div>

        <Button
          size="sm"
          className={cn(
            'bg-[#151B38] ',
            'w-auto min-w-[110px] px-5 py-2',
            'h-10 sm:h-11 md:h-13',
            'font-bold text-[clamp(14px,1.6vw,16px)] shadow-sm',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent',
          )}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span className="flex flex-row items-center justify-between gap-2.5 ">
            <Calendar size={20} />
            Book a Demo
          </span>
        </Button>
      </div>

      {/* right side */}
      <div className="flex-shrink-0 flex items-center justify-end w-[48%] max-w-[560px] max-[1200px]:w-[40%] max-[1024px]:w-[45%] max-[800px]:w-full">
        <img src={dashboard} alt="dashboard" className="w-full h-auto object-contain select-none" />
      </div>
    </div>
  );
};

export default InfoComp;
