import  { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'react-toastify';

const signinSchema = z
  .object({
   
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
  })
type SigninFormValues = z.infer<typeof signinSchema>;

const LoginPage = () => {
   const [showPw, setShowPw] = useState(false);
     const { mutateAsync: signAsync, isPending: isLogging } = useLogin();
   
   const navigate = useNavigate()
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    } = useForm<SigninFormValues>({
      resolver: zodResolver(signinSchema),
      defaultValues: {
        email: '',
        password: '',
      },
    });
     async function onSubmit(data: SigninFormValues) {
       try {
         const result = await signAsync(data); 
         reset();
        //  toast.success('Signed in successfully');
         navigate('/dashboard');
       } catch (err: any) {
        console.log("err",err)
         const msg = err?.response?.data?.error ?? err?.message ?? 'Login failed';
         toast.error(msg);
       }
     }

  return (
    <div
      className="min-h-screen bg-[#FFF] flex items-start justify-center px-4
    "
    >
      <div
        className="max-w-[1100px] w-full bg-white rounded-lg overflow-hidden grid"
        style={{ minHeight: 720 }}
      >
        <div
          className="px-[clamp(1rem,4vw,3rem)] py-[clamp(1.2rem,3vw,3rem)] flex flex-col justify-center
    
        
        "
          // animate__animated
          // animate__flipInY
        >
          <div className="max-w-[420px] w-full mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#404059] mb-2 block">Email</label>
                <input
                  {...register('email')}
                  placeholder="Enter Email"
                  className="w-full border border-[#404059] rounded-md px-4 py-3 text-sm placeholder:text-[#40405999] placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#E8F7F1]"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#404059] mb-2 block">Password</label>
                <div className="relative w-full">
                  <input
                    {...register('password')}
                    type={showPw ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full border border-[#404059] rounded-md px-4 py-3 text-sm placeholder:text-[#40405999] placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#E8F7F1]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6b6f76] p-1"
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>
              <div
                className="flex flex-col justify-start items-end cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/forget-password');
                }}
              >
                <span className="underline text-[#404059] hover:opacity-[0.5]">
                  Forget password?
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLogging || !!errors?.email || !!errors?.password}
                className={`
                  w-full rounded-md py-3 font-semibold transition text-white
                  ${
                    isSubmitting || isLogging || errors.email || errors.password
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#0f1724] hover:bg-opacity-95'
                  }
                `}
              >
                {isSubmitting || isLogging ? (
                  <div className="flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
