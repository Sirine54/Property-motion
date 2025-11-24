import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {  Eye, EyeOff,X } from 'lucide-react';
import { checkPasswordConditions } from '@/helper/helper';
import { useRegister } from '@/hooks/useRegister';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from '@/components/ui/spinner';

const signupSchema = z
  .object({
    businessName: z.string().min(1, 'Business name is required'),
    officeAddress: z.string().min(1, 'Office address is required'),
    postCode: z.string().min(1, 'Post code is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm password'),
  })
   .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .refine((d) => {
    const c = checkPasswordConditions(d.password);
    return (
      c.minLength &&
      c.hasUpperCase &&
      c.hasLowerCase &&
      c.hasNumber &&
      c.hasSpecialChar &&
      c.noForbiddenChars
    );
  }, {
    path: ["password"],
    message:
      "Password must has be at least",
  });

type SignupFormValues = z.infer<typeof signupSchema>;

const SignUpPage = () => {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false);
  const [showPwC,setShowPwC] = useState(false);

  const { mutateAsync: registerAsync, isPending: isRegistering } = useRegister();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    clearErrors,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      businessName: '',
      officeAddress: '',
      postCode: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

   const pwd = watch('password') || '';
   const conditions = checkPasswordConditions(pwd);

   const rules: { key: keyof typeof conditions; label: string }[] = [
     { key: 'minLength', label: 'At least 8 characters' },
     { key: 'hasUpperCase', label: 'One uppercase letter (A–Z)' },
     { key: 'hasLowerCase', label: 'One lowercase letter (a–z)' },
     { key: 'hasNumber', label: 'One number (0–9)' },
     { key: 'hasSpecialChar', label: 'One special character (e.g. !@#)' },
     { key: 'noForbiddenChars', label: 'No forbidden symbols ` \' " \\ ; | < > $' },
   ];

   useEffect(() => {
     const allGood = Object.values(conditions).every(Boolean);
     if (allGood) {
       clearErrors('password');
     }
   }, [pwd]); 
  async function onSubmit(data: SignupFormValues) {
    try {
      const payload = {
        email: data.email,
        password: data.password,
        name: data.businessName,  
        businessName: data.businessName,
        officeAddress: data.officeAddress,
        postCode: data.postCode,
      };

      const created = await registerAsync(payload);
      console.log('created', created);
      reset();
      navigate('/login');
      toast.success('Account created successfully!');
    } catch (err: any) {
      const message = err?.message || "Erreur lors de l'inscription";
      toast.error(message);
    }
  }
  return (
    <div className="min-h-screen bg-[#FFF] flex items-start justify-center px-4">
      <div
        className="max-w-[1100px] w-full bg-white rounded-lg overflow-hidden grid"
        style={{ minHeight: 720 }}
      >
        <div className="px-[clamp(1rem,4vw,3rem)] py-[clamp(1.2rem,3vw,3rem)] flex flex-col justify-center">
          <div className="max-w-[420px] w-full mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Business Name */}
              <div className="flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#404059] mb-2 block">
                  Business Name
                </label>
                <input
                  {...register('businessName')}
                  placeholder="Enter Business Name"
                  className="w-full border border-[#404059] rounded-md px-4 py-3 text-sm placeholder:text-[#40405999] placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#E8F7F1]"
                />
                {errors.businessName && (
                  <p className="text-red-500 text-xs mt-1">{errors.businessName.message}</p>
                )}
              </div>

              {/* Office Address */}
              <div className="flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#404059] mb-2 block">
                  Office Address
                </label>
                <input
                  {...register('officeAddress')}
                  placeholder="Enter Office Address"
                  className="w-full border border-[#404059] rounded-md px-4 py-3 text-sm placeholder:text-[#40405999] placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#E8F7F1]"
                />
                {errors.officeAddress && (
                  <p className="text-red-500 text-xs mt-1">{errors.officeAddress.message}</p>
                )}
              </div>

              {/* Post Code */}
              <div className="flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#404059] mb-2 block">Post Code</label>
                <input
                  {...register('postCode')}
                  placeholder="Enter Post Code"
                  className="w-full border border-[#404059] rounded-md px-4 py-3 text-sm placeholder:text-[#40405999] placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#E8F7F1]"
                />
                {errors.postCode && (
                  <p className="text-red-500 text-xs mt-1">{errors.postCode.message}</p>
                )}
              </div>

              {/* Email */}
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

              {/* Password */}
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
                  <>
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>

                    {pwd.length ? (
                      <ul className="mt-3 space-y-1">
                        {rules.map(({ key, label }) => {
                          const satisfied = Boolean(conditions[key]);
                          if (satisfied) return null;

                          return (
                            <li key={key} className="flex items-center gap-1 text-red-500 text-xs ">
                              <X className="3-4 h-3" />
                              <span>{label}</span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#404059] mb-2 block">
                  Confirm Password
                </label>
                <div className="relative w-full">
                  <input
                    {...register('confirmPassword')}
                    type={showPwC ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    className="w-full border border-[#404059] rounded-md px-4 py-3 text-sm placeholder:text-[#40405999] placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#E8F7F1]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwC((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6b6f76] p-1"
                    aria-label={showPwC ? 'Hide password' : 'Show password'}
                  >
                    {showPwC ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isRegistering || isSubmitting}
                className={`
                  w-full rounded-md py-3 font-semibold transition text-white
                  ${
                    isRegistering || isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#0f1724] hover:bg-opacity-95'
                  }
                `}
              >
                {isRegistering || isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  'Sign up'
                )}
              </button>

              <p className="text-[14px] font-medium text-[#404059E5] text-center mt-4">
                By signing up to create an account I accept Company's{' '}
                <a
                  className="underline decoration-[#404059E5] text-[#404059E5] font-medium"
                  href="#"
                >
                  Terms of use & Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUpPage;