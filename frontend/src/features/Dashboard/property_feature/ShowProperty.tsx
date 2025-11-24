import { Donut } from '../dashboard_feature/CustomCard';
import { EllipsisVertical } from 'lucide-react';

const UPLOADED_FALLBACK = '/mnt/data/e1c32dcf-c429-4a65-bc26-19062706517b.png'; 

type Property = {
  id: string;
  name: string;
  address?: string;
  reference?: string | number;
  propertyType?: string;
  propertyValue?: number | null;
  propertyOn?: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  floors?: number | null;
  dimensions?: string | number | null;
  restOf?: string | null;
  accessThrough?: string | null;
  imageUrl?: string | null;
  marketingPercent?: number;
  compliancePercent?: number;
};

const sampleProperty: Property = {
  id: '9f07cba5-4f6b-4bfb-98fc-c05a630447b9',
  name: 'Test',
  address: '19 College Parade Salusbury Road, London, UK',
  reference: 12,
  propertyType: 'Penthouse',
  propertyValue: 800,
  propertyOn: 'Let',
  bedrooms: 2,
  bathrooms: 1,
  floors: 1,
  dimensions: '100 m²',
  restOf: 'Garden',
  accessThrough: 'Concierge/Porter',
  imageUrl: UPLOADED_FALLBACK,
  marketingPercent: 20,
  compliancePercent: 20,
};

type Props = {
  property?: Property;
  apiBaseUrl?: string; 
};


export default function PropertyDetailPage({ property = sampleProperty }: Props) {
  const {
    name,
    address,
    reference,
    propertyType,
    propertyValue,
    propertyOn,
    bedrooms,
    bathrooms,
    floors,
    dimensions,
    restOf,
    accessThrough,
    imageUrl,
    marketingPercent = 20,
    compliancePercent = 20,
  } = property;
 console.log('image', restOf);

  return (
    <div className="w-full  mx-auto p-4 md:p-6 bg-white relative">
      <div className="flex flex-col md:flex-row gap-6 ">
        {/* Left - Image */}
        <div className="w-full md:w-[280px] flex-shrink-0">
          <div className="relative w-full h-[200px] md:h-[220px] rounded-2xl overflow-hidden shadow-md">
            <img
              src={`http://localhost:4000/${imageUrl}`}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop';
              }}
            />
          </div>
        </div>

        {/* Right - Property Header and Basic Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="text-left">
              <h4 className="text-2xl font-bold text-slate-900 mb-2">{name}</h4>
              <p className="text-sm text-slate-600 mb-1">{address}</p>
              <p className="text-sm text-slate-500">Ref: {reference}</p>
            </div>
            <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
              <EllipsisVertical size={20} className="text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="my-5">
        <h2 className="text-lg font-semibold text-slate-900 mb-4 text-left">Property Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-3 text-sm text-left">
          <div className="space-y-2">
            <div>
              <span className="text-slate-600">Property type: </span>
              <span className="font-medium text-slate-900">{propertyType ?? '-'}</span>
            </div>
            <div>
              <span className="text-slate-600">No. of bedrooms: </span>
              <span className="font-medium text-slate-900">{bedrooms ?? '-'}</span>
            </div>
            <div>
              <span className="text-slate-600">Dimension: </span>
              <span className="font-medium text-slate-900">{dimensions ?? '-'}</span>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-2">
            <div>
              <span className="text-slate-600">Property value: </span>
              <span className="font-medium text-slate-900">
                {propertyValue != null ? `£ ${propertyValue}` : '-'}
              </span>
            </div>
            <div>
              <span className="text-slate-600">No. of bathrooms: </span>
              <span className="font-medium text-slate-900">{bathrooms ?? '-'}</span>
            </div>
            <div>
              <span className="text-slate-600">Rest of: </span>
              <span className="font-medium text-slate-900">{restOf ?? '-'}</span>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-2">
            <div>
              <span className="text-slate-600">Property on: </span>
              <span className="font-medium text-slate-900">{propertyOn ?? '-'}</span>
            </div>
            <div>
              <span className="text-slate-600">No. of floors: </span>
              <span className="font-medium text-slate-900">{floors ?? '-'}</span>
            </div>
            <div>
              <span className="text-slate-600">Access through: </span>
              <span className="font-medium text-slate-900">{accessThrough ?? '-'}</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-8 border-slate-200" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">Marketing</h3>
          <div className="flex flex-col items-center">
            <Donut percentage={marketingPercent} />
            <div className="mt-6 space-y-3 text-center flex justify-between items-center gap-6">
              <div className="flex items-center justify-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-[#0f1724]" />
                <span className="text-sm text-slate-700">{marketingPercent}% Completed</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-[#27C499]" />
                <span className="text-sm text-slate-700">{100 - marketingPercent}% Remaining</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">Compliance</h3>
          <div className="flex flex-col items-center">
            <Donut percentage={compliancePercent} />
            <div className="mt-6 space-y-3 text-center flex justify-between items-center gap-6">
              <div className="flex items-center justify-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-[#0f1724]" />
                <span className="text-sm text-slate-700">{compliancePercent}% Completed</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-[#27C499]" />
                <span className="text-sm text-slate-700">{100 - compliancePercent}% Remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
