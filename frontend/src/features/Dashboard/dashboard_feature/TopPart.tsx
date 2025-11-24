import Buildings from '@/assets/Buildings';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const TopPart = () => {
  return (
    <div className="bg-[#151B38] shadow-md rounded-[8px] w-full flex flex-row justify-between px-16 py-3.5">
      <div className="flex flex-col items-start justify-center text-left text-[clamp(24px,4vw,40px)]">
        <h2 className="text-white font-bold">
          Capture the <span className="text-[#27C499]">Essence,</span>
        </h2>
        <h2 className=" text-white font-bold">
          Sell the <span className="text-[#27C499]">Dream.</span>
        </h2>
        <Button
          size="sm"
          className={cn(
            'bg-[#27C499]',
            'cursor-pointer',
            'w-auto min-w-[110px] px-5 py-2',
            'h-10 sm:h-11 md:h-12',
            'font-bold text-[clamp(14px,1.6vw,16px)] shadow-sm',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent',
          )}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Book Now
        </Button>
      </div>
      <Buildings
        className="
                  w-full
                  max-w-[clamp(220px,30vw,319px)]
                  h-auto
                  object-contain
                "
      />
    </div>
  );
}

export default TopPart
