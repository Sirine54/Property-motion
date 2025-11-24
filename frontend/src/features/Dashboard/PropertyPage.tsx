import { Button } from '@/components/ui/button';
import { SquarePlus } from 'lucide-react';
import { useState } from 'react';
import PropertyCard from './property_feature/PropertyCard';
import ToggleButtons from './property_feature/ToggleButtons';
import PropertyTable from './property_feature/PropertyTable';
import CreateProperty from './CreateProperty';
import { useProperties } from '@/hooks/useGetProperties';
import PropertyDetailPage from './property_feature/ShowProperty';

const LOCAL_FALLBACK_IMAGE = '/mnt/data/e1c32dcf-c429-4a65-bc26-19062706517b.png';

const PropertyPage: React.FC = () => {
  const [active, setActive] = useState<'Cards' | 'List'>('Cards');
  const { data: propertiesResponse, isLoading, isError } = useProperties();
  const properties = propertiesResponse?.items ?? [];
  const [showCreate, setShowCreate] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);

  if (showCreate) {
    return (
      <div className="w-full mt-3.5">
        <CreateProperty
          onCancel={() => setShowCreate(false)}
          onSaved={() => setShowCreate(false)}
        />
      </div>
    );
  }
console.log('properties',properties);
  const cards = properties.map((p) => ({
    id: p.id,
    img: p.imageUrl ? p.imageUrl : LOCAL_FALLBACK_IMAGE,
    name: p.name,
    address: { address: p.address ?? '' },
    nbRooms: p.bedrooms ?? 0,
    nbBath: p.bathrooms ?? 0,
    surface: p.dimensions ? Number(p.dimensions) : undefined,
    perCompliance: 0,
    perMarketing: 0,
    propertyValueFormatted: p.propertyValue,
    raw: p,
  }));

  const tableData = properties.map((p) => ({
    id: p.id,
    name: p.name,
    address: p.address ?? '',
    beds: p.bedrooms ?? 0,
    baths: p.bathrooms ?? 0,
    dimension: p.dimensions ?? '-',
    marketing: 0,
    compliance: 0,
    img: p.imageUrl ?? LOCAL_FALLBACK_IMAGE,
    createdAt: p.createdAt,
    propertyValue: p.propertyValue,
    raw: p,
  }));

  const handleCardClick = (card: any) => {
    const raw = card.raw ?? card;
    if (!raw.imageUrl) raw.imageUrl = LOCAL_FALLBACK_IMAGE;
    setSelectedProperty(raw);
  };

  const handleCloseDetail = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row w-full shadow-md rounded-[6px] justify-between bg-white px-7 py-5 mt-3.5">
        <div className="flex flex-col items-start leading-7">
          <h5 className="font-bold">New Property</h5>
          <span className="text-[14px] font-medium">You can add your property listings</span>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => setShowCreate(true)}
            variant={'outline'}
            className="px-4! w-full py-5 border-black border-2 rounded-[6px] cursor-pointer"
          >
            <SquarePlus />
            <span className="font-semibold">Add New Property</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col w-full shadow-md rounded-[6px] gap-2.5 justify-between bg-white px-7 py-5 mt-3.5">
        <div className="flex flex-row justify-between items-center">
          <h5 className="font-bold">Properties listing</h5>
         {!selectedProperty ? <ToggleButtons
            active={active}
            setActive={(e) => {
              setActive(e as 'Cards' | 'List');
            }}
          />
          :
          <div className="">
          <button
            onClick={handleCloseDetail}
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            ← Back to list
          </button>
        </div>

          }
        </div>

        {selectedProperty ? (

            <PropertyDetailPage property={selectedProperty}  />
        ) : (
          <>
            {isLoading ? (
              <div className="py-8 text-center">Loading properties…</div>
            ) : isError ? (
              <div className="py-8 text-center text-red-500">Failed to load properties.</div>
            ) : active === 'Cards' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cards.length ? (
                  cards.map((c) => (
                    <div
                      key={c.id}
                      className="h-full cursor-pointer"
                      onClick={() => handleCardClick(c)}
                    >
                      <PropertyCard
                        img={c.img}
                        name={c.name}
                        address={c.address}
                        nbRooms={c.nbRooms}
                        nbBath={c.nbBath}
                        surface={c.surface}
                        perCompliance={c.perCompliance}
                        perMarketing={c.perMarketing}
                        className="h-full"
                      />
                    </div>
                  ))
                ) : (
                  <div className="p-6">No properties found.</div>
                )}
              </div>
            ) : (
              <PropertyTable data={tableData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;