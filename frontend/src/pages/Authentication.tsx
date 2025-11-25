import LoginImg from '@/assets/LoginImg';
import MotionIcon from '@/assets/motion-icon'
import SignUpImg from '@/assets/SignupImg';
import { useLocation, useNavigate } from 'react-router-dom';
type AuthenticationLayoutProps = {
  children: React.ReactNode;
};

const AuthenticationLayout = (props: AuthenticationLayoutProps) => {
     const location = useLocation();
     const navigate = useNavigate();
    const active = location.pathname.includes('signup')
      ? 'signup'
      : location.pathname.includes('forget-password')
        ? 'forget-password'
        : 'login';
    const activeText = [
      {
        activePath: 'signup',
        headerText: 'Get Started!',
        contentText: 'Create an account to continue.',
        icon: (
          <SignUpImg
            className="
        w-full
        max-w-[clamp(220px,30vw,520px)]
        h-auto
        object-contain
      "
          />
        ),
      },
      {
        activePath: 'login',
        headerText: 'Welcome Back!',
        contentText: 'Login to continue to your account.',
        icon: (
          <LoginImg
            className="
                  w-full
                  max-w-[clamp(220px,30vw,520px)]
                  h-auto
                  object-contain
                "
          />
        ),
      },
      {
        activePath: 'forget-password',
        headerText: 'Forgot your password?',
        contentText:
          'Enter your account email and we’ll send a secure link to reset your password.',
        icon: (
          <LoginImg
            className="
                  w-full
                  max-w-[clamp(220px,30vw,520px)]
                  h-auto
                  object-contain
                "
          />
        ),
      },
    ];
  const currentContent = activeText.find((item) => item.activePath === active) || activeText[1];

  return (
    <div
      className="
    absolute inset-0 w-full bg-white
    flex flex-col overflow-y-scroll       

    md:flex-row md:overflow-hidden        
    custom-scrollbar
  "
    >
      {/* right side  */}
      <div
        className="bg-[#ECF1F4] h-full w-full md:w-[45%] rounded-tr-[120px]  
        px-[clamp(1rem,7vw,7rem)]
        py-[clamp(4.5rem,2.5vw,4.5rem)]
        animate__animated animate__bounceInLeft
        "
      >
        {/* part 1 */}
        <div
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          <MotionIcon />
        </div>

        <div
          className="
            h-full
            grid 
            grid-rows-[5%_55%_25%] 
            grid-cols-1 
            gap-6 
            mt-[6vw] 
            justify-items-center 
            text-[#151B38]
          "
        >
          <div className="text-center space-y-1.5">
            <h1 className="font-extrabold">{currentContent.headerText}</h1>
            <span className="font-medium">{currentContent.contentText}</span>
          </div>

          <div className="w-full flex items-center justify-center">{currentContent.icon}</div>

          <div className="text-center px-4">
            <h2 className="text-sm md:text-[24px] sm:text-[16px] font-medium">
              Capture every detail with premium photos, videos, and 3D visuals.
            </h2>
          </div>
        </div>
      </div>
      {/*  left side */}
      <div
        className="flex-1
          px-[clamp(1rem,7vw,7rem)]
             py-[clamp(4.5rem,2.5vw,4.5rem)]"
      >
        {!location.pathname.includes('forget-password') && (
          <div className="inline-flex bg-[#ECF1F4] rounded-[8px p-0.5 shadow-sm">
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className={`px-12 py-2 rounded-[8px] text-sm font-semibold transition ${
                active === 'signup' ? 'bg-[#20C997] text-white' : 'text-[#404059]'
              }`}
            >
              Sign up
            </button>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className={`px-12 py-2 rounded-[8px] text-sm font-semibold transition ${
                active === 'login' ? 'bg-[#20C997] text-white' : 'text-[#404059]'
              }`}
            >
              Sign in
            </button>
          </div>
        )}
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default  AuthenticationLayout

