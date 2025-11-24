
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});
type FormData = z.infer<typeof forgotSchema>;

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });

      setSent(true);
    } catch (err: any) {
      setServerError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF] flex items-start justify-center px-4">
      <div
        className="max-w-[1100px] w-full bg-white rounded-lg overflow-hidden grid"
        style={{ minHeight: 720 }}
      >
        <div className="px-[clamp(1rem,4vw,3rem)] py-[clamp(1.2rem,3vw,3rem)] flex flex-col justify-center">
          <div className="max-w-[420px] w-full mx-auto">
            {!sent ? (
              <>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex flex-col justify-start items-start">
                    <label className="text-sm font-medium text-[#404059] mb-2 block">Email</label>
                    <input
                      {...register('email')}
                      placeholder="Enter Email"
                      className="w-full border border-[#404059] rounded-md px-4 py-3 text-sm placeholder:text-[#40405999] placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#E8F7F1]"
                    />
                    {formState.errors.email && (
                      <p className="text-red-500 text-xs mt-1">{formState.errors.email.message}</p>
                    )}

                    {serverError && <p className="text-red-600 text-sm">{serverError}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="w-full bg-[#0f1724] text-white rounded-md py-3 font-semibold hover:opacity-95 transition"
                  >
                    {formState.isSubmitting ? 'Sending...' : 'Send reset link'}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <a href="/login" className="text-sm underline text-[#39404b]">
                    Back to sign in
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Check your email</h3>
                <p className="text-sm text-[#6b6f76] mb-6">
                  If an account exists with that email, we've sent a link to reset your password.
                  The link will expire in 1 hour.
                </p>

                <div className="space-y-3">
                  <a
                    href="/login"
                    className="block w-full text-center bg-white border border-[#D9D6E3] rounded-md py-2"
                  >
                    Back to sign in
                  </a>
                  <button
                    onClick={() => setSent(false)}
                    className="block w-full text-center text-sm text-[#39404b] underline"
                  >
                    I didn't receive an email
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
