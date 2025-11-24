import { LayoutGrid, TextAlignJustify } from 'lucide-react';


type ToggleProps = {
  active: 'Cards' | 'List';
  setActive: (active:string) => void;
};
export default function ToggleButtons(props: ToggleProps) {

  const base =
    'flex flex-row items-center justify-center gap-2.5 min-w-[50px] items-center justify-center px-3 py-2 text-sm font-medium rounded-md border transition-colors';

  return (
    <div className="flex gap-2">
      <button
        onClick={() => props.setActive('Cards')}
        className={
          base +
          (props.active === 'Cards'
            ? ' bg-[#151B38] text-white border-[#151B38]'
            : ' bg-[#ECF1F4] text-slate-600 border-none hover:bg-slate-50')
        }
      >
        <LayoutGrid />
        Cards
      </button>

      <button
        onClick={() => props.setActive('List')}
        className={
          base +
          (props.active === 'List'
            ? ' bg-[#151B38] text-white border-[#151B38]'
            : ' bg-[#ECF1F4] text-slate-600 border-none hover:bg-slate-50')
        }
      >
        <TextAlignJustify />
        List
      </button>
    </div>
  );
}
