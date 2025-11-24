import { useEffect, useState } from 'react';
import {
  Calendar,
  CalendarPlus2,
  Tickets,
  Scan,
  LayoutGrid,
  Building2,
  LogOut,
  CircleQuestionMark,
} from 'lucide-react';
import { Tooltip, TooltipContent,TooltipTrigger } from '@/components/ui/tooltip';
import { NavLink, useNavigate } from 'react-router-dom';
import MotionIconDark from '@/assets/MotionIconDark';
import MotionLittle from '@/assets/motion-little';
import { useAuth } from '../../../../service/useAuth';

const sideList = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Booking',
    path: '/booking',
    icon: Calendar,
  },
  {
    title: 'New Booking',
    path: '/new-booking',
    icon: CalendarPlus2,
  },
  {
    title: 'Amendments',
    path: '/amendments',
    icon: Scan,
  },
  {
    title: 'My Properties',
    path: '/properties',
    icon: Building2,
  },
  {
    title: 'Payments',
    path: '/payments',
    icon: Tickets,
  },
];

const SideBar = () => {
  const navigate = useNavigate()
      const [isSmall, setIsSmall] = useState(false);
      const {logout} = useAuth()
      async function handleLogout() {
        await logout(); 
        navigate('/login');
      }

      useEffect(() => {
        const check = () => setIsSmall(window.innerWidth < 640); 
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
      }, []);
  return (
    <div className="h-full ">
      <aside
        className="max-w-64 w-full bg-[#151B38] text-white min-h-screen py-6 px-4 flex flex-col justify-between *:
      transition-[width] duration-1000 ease-in-out "
      >
        <div className="text-xl font-bold mb-10 px-2">
          {isSmall ? <MotionLittle /> : <MotionIconDark />}
        </div>

        <nav className="flex flex-col gap-2 flex-1 mt-[20%]">
          {sideList.map((item) => {
            const Icon = item.icon;
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger>
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `
                    flex items-center gap-3 px-3 py-2   text-[18px] transition-colors

                    text-white hover:text-[#FFFFFFBF]    

                    ${
                      isActive
                        ? 'bg-white/10 font-extrabold border-l-2 border-l-white shadow-md'
                        : ' hover:bg-white/10 text-white'
                    }
                `
                    }
                    end
                  >
                    <Icon className="w-6 h-6 sm:w-5 sm:h-5 transition-all " color="white" />
                    <span className="text-[#FFFFFFBF] sm:inline hidden">{item.title}</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right" className="sm:hidden bg-[#151B38] text-md">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        <nav className="flex flex-col">
          <Tooltip>
            <TooltipTrigger>
              <div
                className={` flex items-center gap-3 px-3 py-2   text-sm transition-colors  text-white hover:text-[#FFFFFFBF]
                hover:bg-white/10 focus:border-l-white
                 text-[18px]
                 cursor-pointer

                `}
              >
                <CircleQuestionMark
                  className="w-6 h-6 sm:w-5 sm:h-5 transition-all "
                  color="white"
                />
                <span className="text-[#FFFFFFBF] sm:inline hidden">Help Center</span>
                <TooltipContent side="right" className="sm:hidden bg-[#151B38] text-md">
                  Help Center
                </TooltipContent>
              </div>
            </TooltipTrigger>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={` flex items-center gap-3 px-3 py-2   text-sm transition-colors  text-white hover:text-[#FFFFFFBF]
                hover:bg-white/10 focus:border-l-white
                 text-[18px]
                 cursor-pointer
                `}
                onClick={handleLogout}
              >
                <LogOut className="w-6 h-6 sm:w-5 sm:h-5 transition-all " color="white" />
                <span className="text-[#FFFFFFBF] sm:inline hidden">Log out</span>
                <TooltipContent side="right" className="sm:hidden bg-[#151B38] text-md">
                  Log out
                </TooltipContent>
              </div>
            </TooltipTrigger>
          </Tooltip>
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;
