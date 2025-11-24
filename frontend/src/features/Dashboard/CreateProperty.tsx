import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "@/assets/imageUpload";
import { CircleParking, Flag, Flower2, Tag, Warehouse, X } from "lucide-react";
import { useCreateProperty } from "@/hooks/useCreateProperty";
import { toast } from "react-toastify";

type Props = {
  onCancel?: () => void;
  onSaved?: () => void;
};

export default function CreateProperty({ onCancel, onSaved }: Props) {
    const createProperty = useCreateProperty(); 
   const [preview, setPreview] = useState<string>("");
   const [imageFile, setImageFile] = useState<File | null>(null);
   const fileInputRef = useRef<HTMLInputElement | null>(null);
   const [formData, setFormData] = useState({
     name: '',
     address: '',
     city: '',
     country: '',
     postCode: '',
     reference: '',
     propertyValue: '',
     propertyType: undefined as string | undefined,
     accessProperty: undefined as string | undefined,
     dimensions: '',
     bedrooms: '' as number | '',
     bathrooms: '' as number | '',
     floors: '' as number | '',
   });

   const [isSale, setIsSale] = useState(true);
   const [isLet, setIsLet] = useState(false);
   const [features, setFeatures] = useState({
     parking: false,
     garden: false,
     garage: false,
   });
  const [errors, setErrors] = useState<Record<string, string>>({});

 const openFileDialog = () => fileInputRef.current?.click();

 const handleFileSelect = (file: File | null) => {
   if (preview && preview.startsWith('blob:')) {
     URL.revokeObjectURL(preview);
   }

   if (!file) {
     setImageFile(null);
     setPreview("");
     return;
   }

   setImageFile(file);
   setPreview(URL.createObjectURL(file));
 };

 const handleDeleteImage = (e: React.MouseEvent) => {
   e.stopPropagation();
   handleFileSelect(null);
   if (fileInputRef.current) fileInputRef.current.value = '';
 };


    const validate = () => {
      const newErrors: Record<string, string> = {};
      if (!formData.name.trim()) newErrors.name = 'Property name is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };


 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();

   if (!validate()) return;

   try {
     await createProperty.mutateAsync({
       name: formData.name,
       address: formData.address,
       city: formData.city,
       country: formData.country || undefined,
       postCode: formData.postCode || undefined,
       reference: formData.reference || undefined,
       propertyValue: formData.propertyValue,
       propertyType: formData.propertyType,
       accessProperty: formData.accessProperty,
       dimensions: formData.dimensions || undefined,
       bedrooms: formData.bedrooms || undefined,
       bathrooms: formData.bathrooms || undefined,
       floors: formData.floors || undefined,
       features: features,
       imageFile: imageFile || undefined,
     });

     toast.success('Property created successfully!');
     onSaved?.();
   } catch (error) {
     toast.error('Failed to create property');
     console.error(error);
   }
 };

 const updateField = (field: keyof typeof formData, value: any) => {
   setFormData((prev) => ({ ...prev, [field]: value }));
 };


  return (
    <Card className="w-full">
      <div className="flex flex-col items-start leading-7 px-7">
        <h5 className="font-bold">Add Property</h5>
      </div>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 grid grid-cols-[2fr_1fr] gap-4">
          <div>
            {/* upload + helper */}
            <div className="flex items-start gap-6">
              {/* Clickable upload box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                className="relative w-36 h-36 rounded-md border border-dashed border-slate-300 flex items-center justify-center cursor-pointer bg-slate-50 hover:bg-slate-100 transition"
              >
                {imageFile ? (
                  <>
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 border shadow-sm hover:bg-white flex items-center justify-center"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2.5 items-center">
                    <ImageUpload />
                    <label className="text-xs font-medium text-slate-700">Upload Image</label>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>

              <p className="text-[12px] font-medium text-slate-400 max-w-[200px] text-left leading-6">
                Recommended resolution is 640×640 with file size less than 2MB
              </p>
            </div>

            {/* name */}
            <div className="flex flex-col w-full items-start leading-9">
              <label className="text-[#151B38] text-[15px] font-semibold">Property Name</label>
              <div className="grid grid-cols-1 w-full">
                <input
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Enter property name"
                  className="border-1 rounded-[4px] pl-4 placeholder:font-medium placeholder:text-[14px] bg-[#ECF1F466]"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
            </div>

            {/* address row */}
            <div className="grid grid-cols-1 gap-3 w-full">
              <div className="flex flex-col w-full items-start leading-9 ">
                <label className="text-[#151B38] text-[15px] font-semibold">Address</label>
                <div className="grid grid-cols-2 gap-3 w-full">
                  <input
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    placeholder="Address"
                    className="border-1 rounded-[4px] pl-4 placeholder:font-medium placeholder:text-[14px] bg-[#ECF1F466]"
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  <input
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="City"
                    className="border-1 rounded-[4px] pl-4 placeholder:font-medium placeholder:text-[14px] bg-[#ECF1F466]"
                  />
                  <input
                    value={formData.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    placeholder="Country"
                    className="border-1 rounded-[4px] pl-4 placeholder:font-medium placeholder:text-[14px] bg-[#ECF1F466]"
                  />
                  <input
                    value={formData.postCode}
                    onChange={(e) => updateField('postCode', e.target.value)}
                    placeholder="Post Code"
                    className="border-1 rounded-[4px] pl-4 placeholder:font-medium placeholder:text-[14px] bg-[#ECF1F466]"
                  />
                </div>
              </div>
            </div>

            {/* details */}
            <div className="grid grid-cols-1 gap-3 w-full">
              <div className="flex flex-col w-full items-start leading-9">
                <label className="text-[#151B38] text-[15px] font-semibold">Details</label>
                <div className="grid grid-cols-2 gap-4 w-full ">
                  <input
                    value={formData.reference}
                    onChange={(e) => updateField('reference', e.target.value)}
                    placeholder="Property reference"
                    className="border-1 rounded-[4px] pl-4 placeholder:font-medium placeholder:text-[14px] bg-[#ECF1F466]"
                  />

                  
                  <input
                    value={formData.propertyValue}
                    onChange={(e => updateField('propertyValue', e.target.value))}
                    placeholder="£ Property value"
                    className="border-1 rounded-[4px] pl-4 placeholder:font-medium placeholder:text-[14px] bg-[#ECF1F466]"
                  />

                  <Select onValueChange={(v) => updateField('propertyType', v)}>
                    <SelectTrigger className="w-full rounded-[4px] bg-[#ECF1F466]">
                      <SelectValue
                        placeholder="Property Type"
                        className="border-1 rounded-[4px] pl-4 placeholder:font-medium placeholder:text-[14px]"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select onValueChange={(v) => updateField('accessProperty', v)}>
                    <SelectTrigger className="w-full rounded-[4px] bg-[#ECF1F466]">
                      <SelectValue
                        placeholder="Access Property"
                        className="border-1 rounded-[4px] pl-4 font-medium text-[14px]"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="shared">Shared</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* sale / let */}
            <div className="grid grid-cols-2 gap-3 w-full my-3.5">
              <button
                type="button"
                onClick={() => {
                  setIsSale(true);
                  setIsLet(false);
                }}
                className={`flex-1 flex gap-2  items-center justify-center py-2 rounded-md border ${isSale ? 'bg-[#151B38] text-white' : 'bg-[#ECF1F466] text-slate-600'}`}
              >
                <Tag size={14} />
                <span>Sale</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLet(true);
                  setIsSale(false);
                }}
                className={`flex-1 flex gap-2  items-center justify-center py-2 rounded-md border ${isLet ? 'bg-[#151B38] text-white' : 'bg-[#ECF1F466] text-slate-600'}`}
              >
                <Flag size={14} />
                <span> Let</span>
              </button>
            </div>

            {/* numeric details */}
            <div className="grid grid-cols-4 gap-6 w-full my-3.5 min-h-10 ">
              <input
                placeholder="Dimension"
                value={formData.dimensions}
                onChange={(e) => updateField('dimensions', e.target.value)}
                min={0}
                className="border-1 rounded-[4px] pl-4 placeholder:font-medium placeholder:text-[14px] bg-[#ECF1F466]"
              />
              <input
                placeholder="No. bedrooms"
                value={formData.bedrooms}
                onChange={(e) => updateField('bedrooms', Number(e.target.value) || '')}
                type="number"
                min={0}
                className="border-1 rounded-[4px] pl-4 placeholder:font-medium placeholder:text-[14px] bg-[#ECF1F466]"
              />
              <input
                placeholder="No. bathrooms"
                value={formData.bathrooms}
                onChange={(e) => updateField('bathrooms', Number(e.target.value) || '')}
                type="number"
                min={0}
                className="border-1 rounded-[4px] pl-4 placeholder:font-medium placeholder:text-[14px] bg-[#ECF1F466]"
              />
              <input
                placeholder="No. floors"
                value={formData.floors}
                onChange={(e) => updateField('floors', Number(e.target.value) || '')}
                type="number"
                min={0}
                className="border-1 rounded-[4px] pl-4 placeholder:font-medium placeholder:text-[14px] bg-[#ECF1F466]"
              />
            </div>

            {/* features */}

            <div className="flex gap-3">
              {[
                { key: 'parking', icon: CircleParking, label: 'Parking' },
                { key: 'garden', icon: Flower2, label: 'Garden' },
                { key: 'garage', icon: Warehouse, label: 'Garage' },
              ].map(({ key, icon: Icon, label }) => (
                <label
                  key={key}
                  className={`flex items-center gap-2 justify-center border rounded-[8px] p-2 px-8 w-full cursor-pointer ${
                    features[key as keyof typeof features]
                      ? 'bg-[#151B38] text-white'
                      : 'bg-[#ECF1F466] text-slate-500'
                  }`}
                >
                  <Checkbox
                    checked={features[key as keyof typeof features]}
                    onCheckedChange={(v) => setFeatures((prev) => ({ ...prev, [key]: Boolean(v) }))}
                    className="hidden"
                  />
                  <Icon size={14} />
                  <span className="text-sm font-medium">{label}</span>
                </label>
              ))}
            </div>

            {/* actions */}
            <div className="flex gap-3 justify-center pt-4 ">
              <Button
                variant="ghost"
                className=" rounded-[4px] px-5.5 py-5 text-[14px]"
                onClick={() => onCancel?.()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#151B38] rounded-[4px] px-5.5 py-5 text-[14px]"
                onClick={(e) => handleSubmit(e)}
              >
                Add Property
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
