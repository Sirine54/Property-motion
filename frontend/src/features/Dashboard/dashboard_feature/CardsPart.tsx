import CustomCard from './CustomCard';
import { SquareArrowOutUpRight } from 'lucide-react';

const CardsPart = () => {
      const staticItems = [
        { title: 'Test', subtitle: 'Service Name' },
        { title: 'Test', subtitle: 'Service Name' },
        { title: 'Test', subtitle: 'Service Name' },
      ];

  return (
    <div className="gap-2.5 flex flex-col w-full">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <CustomCard
            title="Marketing"
            isCamembert
            camPercentage={20}
            per_complete={20}
            per_remaining={80}
            className="h-full"
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <CustomCard
            title="Compliance"
            isCamembert
            camPercentage={20}
            per_complete={20}
            per_remaining={80}
            className="h-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <CustomCard title="Upcoming" className="h-full">
          <ul className="space-y-3">
            {staticItems.map((item, i) => (
              <li key={i} className="flex items-center justify-between border-b-2 pb-2.5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div className="flex flex-col items-start justify-end ">
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.subtitle}</div>
                  </div>
                </div>
                <a href="#" className="text-gray-400" onClick={(e) => e.preventDefault()}>
                  <SquareArrowOutUpRight size={18} color="black" />
                </a>
              </li>
            ))}
          </ul>
        </CustomCard>

        <CustomCard title="Upcoming" className="h-full">
          <ul className="space-y-3">
            {staticItems.map((item, i) => (
              <li key={i} className="flex items-center justify-between border-b-2 pb-2.5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div className="flex flex-col items-start justify-end ">
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.subtitle}</div>
                  </div>
                </div>
                <a href="#" className="text-gray-400" onClick={(e) => e.preventDefault()}>
                  <SquareArrowOutUpRight size={18} color="black" />
                </a>
              </li>
            ))}
          </ul>
        </CustomCard>

        <CustomCard title="Upcoming" className="h-full">
          <ul className="space-y-3">
            {staticItems.map((item, i) => (
              <li key={i} className="flex items-center justify-between border-b-2 pb-2.5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div className="flex flex-col items-start justify-end ">
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.subtitle}</div>
                  </div>
                </div>
                <a href="#" className="text-gray-400" onClick={(e) => e.preventDefault()}>
                  <SquareArrowOutUpRight size={18} color="black" />
                </a>
              </li>
            ))}
          </ul>
        </CustomCard>
      </div>
    </div>
  );
};

export default CardsPart
