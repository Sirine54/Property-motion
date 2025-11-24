import { Bell, ChevronDown, Search, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/globalStore';

const Header= () => {
  const user = useUserStore((s) => s.user);
  console.log('useree', user);

  return (
    <header
      className="sticky w-full min-h-16 flex items-center justify-between
    border border-b-[#40405966]
     px-6
     py-2.5
    "
    >
      <div className="flex flex-wrap w-full">
        <h2 className="font-medium text-[clamp(1rem,2vw,1.75rem)] text-[#151B38] text-left">
          Hello, { user?.name || 'user name'}
        </h2>
      </div>
      <div className="flex flex-row items-center justify-between gap-2.5 ">
        <div className="relative w-full max-w-sm">
          <input
            type="search"
            placeholder="Search..."
            className="w-full lg:w-[322px] bg-white pl-9 pr-3 py-2 text-sm  border-[0.5px] border-[#40405999] rounded-[4px] shadow-sm focus:outline-none focus:ring-2"
          />

          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <div className="flex flex-row items-center justify-between ml-3.5 gap-2">
          <div className="relative">
            <span className="absolute w-2 h-2 rounded-full -right-1 top-[-5px] z-30 bg-[#D53636]" />
            <Bell color="#404059" />
          </div>

          <Settings color="#404059" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between gap-2.5">
        <Avatar className="size-16">
          <AvatarImage
            src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
            alt="Hallie Richards"
          />
          <AvatarFallback className="text-xs">HR</AvatarFallback>
        </Avatar>
        <span className="sm:inline hidden text-[.8em] w-[50px]">{user?.name || 'user name'}</span>
        <div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                aria-label="Open menu"
                size="icon-sm"
                className="bg-transparent border-none hover:bg-transparent cursor-pointer"
              >
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuLabel>Profile</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>Upload photo</DropdownMenuItem>
                <DropdownMenuItem>My properties</DropdownMenuItem>
                <DropdownMenuItem className="text-red-700">Delete Account</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
