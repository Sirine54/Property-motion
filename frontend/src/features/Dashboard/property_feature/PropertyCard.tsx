import { Bath, BedDouble, Scan } from 'lucide-react';

type Surface = { address?: string };
type Props = {
  img?: string;
  name: string;
  address?: Surface;
  nbRooms?: number;
  nbBath?: number;
  surface?: number;
  perCompliance?: number; 
  perMarketing?: number; 
  className?: string;
};

  export const getFullImageUrl = (path: string | null) => {
    if (!path)
      return 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop';

    if (path.startsWith('http')) return path;

    const BACKEND_URL = (import.meta as any).env.VITE_BASE_URL || 'http://localhost:4000';
    return `${BACKEND_URL}${path}`;
  };
export default function PropertyCard({
  img = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  name,
  address,
  nbRooms = 0,
  nbBath = 0,
  surface = 0,
  perCompliance = 0,
  perMarketing = 0,
  className = '',
}: Props) {
 
  
  return (
    <article className={`bg-white rounded-xl shadow-md overflow-hidden w-full ${className}`}>
      <div className="w-full relative" style={{ paddingTop: '56.25%' }}>
        <img
          src={getFullImageUrl(img)}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop';
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex flex-col items-start justify-center">
          <h4 className="text-lg font-semibold text-slate-900 mb-1">{name}</h4>
          <p className="text-xs text-slate-500 mb-3">{address?.address}</p>
        </div>
        <div className="flex items-center justify-between gap-6 text-xs text-slate-600 mb-4">
          <div className="flex flex-row gap-1.5 items-center justify-center">
            <BedDouble color="#27C499" size={'18'} />
            <div className="flex flex-row gap-1.5">
              <span>{nbRooms} </span>
              <span>Beds</span>
            </div>
          </div>
          <div className="flex flex-row gap-1.5 items-center justify-center">
            <Bath color="#27C499" size={'18'} />
            <div className="flex flex-row gap-1.5">
              <span>{nbBath}</span> <span>Bathrooms</span>
            </div>
          </div>
          <div className="flex flex-row gap-1.5 items-center justify-center">
            <Scan color="#27C499" size={'18'} />
            <div className="flex flex-row gap-1.5">
              <span>{surface}</span>
              <span> m²</span>
            </div>
          </div>
        </div>

        <hr className="border-t-[1px] border-slate-100 mb-4" />

        <div className="flex gap-3">
          <div className="flex-1 bg-[#27C49926] p-2 rounded-lg ">
            <div className="flex items-center justify-between  text-[12px] font-medium text-slate-700">
              <span className="text-xs font-semibold text-slate-700  m-auto">{perMarketing}%</span>
            </div>
          </div>

          <div className="flex-1 bg-[#27C49926] p-2 rounded-lg">
            <div className="flex items-center justify-between text-[12px] font-medium text-slate-700">
              <span className="text-xs font-semibold text-slate-700  m-auto">{perCompliance}%</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
