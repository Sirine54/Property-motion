'use client';

import * as React from 'react';
import { MenuIcon } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../../components/ui/button';
import { cn } from '@/lib/utils';
import MotionIcon from '@/assets/motion-icon';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const [isMobile, setIsMobile] = React.useState(false);
  const navigate = useNavigate()

  const baseLinks = [
    {
      name: 'Home',
      path: '/',
      active: true,
    },
    {
      name: 'Services',
      path: '/services',
    },
    {
      name: 'Pricing',
      path: '/pricing',
    },
    {
      name: 'About',
      path: '/about',
    },
    {
      name: 'Contact',
      path: '/contact',
    },
  ];
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      console.log('width', width < 1000);
      setIsMobile(width < 1000);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={cn('sticky top-0 left-0 right-0 z-50 backdrop-blur flex w-full ')}>
      <div className="flex items-center gap-2 w-full justify-between ">
        {/* Logo (left) */}
        <button className="bg-transparent hover:border-none cursor-pointer p-0">
          <MotionIcon />
        </button>

        {!isMobile && (
          <div className="flex items-center flex-1">
            <div className="flex flex-1 justify-center">
              <NavigationMenu>
                <NavigationMenuList
                  className="
                flex-1 flex items-center justify-center
                
                  max-w-full
                "
                >
                  {baseLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <button
                        onClick={(e) => e.preventDefault()}
                        className={cn(
                          'cursor-pointer',
                          'group inline-flex h-9 w-max items-center justify-center py-2 px-[clamp(0.5rem,1vw,1.5rem)] font-medium transition-all',
                          'hover:font-extrabold focus:font-extrabold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent',
                          link.active ? 'text-black' : 'text-foreground/80 hover:text-foreground',
                        )}
                      >
                        <span className="whitespace-nowrap">{link.name}</span>
                      </button>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center justify-end gap-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'hover:bg-accent hover:text-accent-foreground',
                  'cursor-pointer',
                  'w-auto min-w-[90px] px-4 py-2',
                  'h-10 sm:h-11 md:h-13',
                  'border-[#151B38] rounded-[6px] border-[1.5px]',
                  'font-bold text-[clamp(14px,1.6vw,16px)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent',
                )}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}
              >
                Sign in
              </Button>

              <Button
                size="sm"
                className={cn(
                  'bg-[#151B38]',
                  'cursor-pointer',
                  'w-auto min-w-[110px] px-5 py-2',
                  'h-10 sm:h-11 md:h-13',
                  'font-bold text-[clamp(14px,1.6vw,16px)] shadow-sm',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent',
                )}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/signup');
                }}
              >
                Get started
              </Button>
            </div>
          </div>
        )}

        {isMobile && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                size="icon"
              >
                <MenuIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-2">
              <NavigationMenu className="max-w-none ">
                <NavigationMenuList className="flex-col items-start justify-start gap-1 flex ">
                  {baseLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full ">
                      <button
                        onClick={(e) => e.preventDefault()}
                        className={cn(
                          'flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer no-underline',
                          link.active ? 'bg-accent text-accent-foreground' : 'text-foreground/80',
                        )}
                      >
                        {link.name}
                      </button>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
              <div className="flex flex-row items-center justify-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'hover:bg-accent hover:text-accent-foreground',
                    'cursor-pointer',
                    'w-auto min-w-[90px] px-4 py-2',
                    'h-10 sm:h-11 md:h-12',
                    'border-[#151B38] rounded-[6px] border-[1.5px]',
                    'font-bold text-[clamp(14px,1.6vw,16px)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent',
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Sign in
                </Button>

                <Button
                  size="sm"
                  className={cn(
                    'bg-[#151B38]',
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
                  Get started
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
}
