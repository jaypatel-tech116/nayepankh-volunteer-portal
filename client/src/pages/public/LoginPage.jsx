import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, ArrowLeft } from 'lucide-react';
import { loginSchema } from '../../schemas/loginSchema';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated, isAdmin, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(isAdmin ? '/admin/dashboard' : '/dashboard', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await login(data.email, data.password);
      if (res.success) {
        toast.success(`Welcome back, ${res.data.user.name}!`);
        if (res.data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-2/5 gradient-hero hero-pattern relative flex-col justify-center p-12">
        <div className="absolute top-20 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">NayePankh Foundation</span>
          </Link>

          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Welcome Back to{' '}
            <span style={{ color: '#f97316' }}>Making a Difference</span>
          </h2>
          <p className="text-white/70 leading-relaxed">
            Access your volunteer dashboard, track your application status, and continue your journey of empowering students across India.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative" style={{ backgroundColor: '#f8fafc' }}>
        <div className="fixed top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="fixed bottom-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm hover:underline transition-colors mb-6 lg:hidden"
            style={{ color: '#64748b' }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="card-elevated p-6 sm:p-8 md:p-10">
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </Link>
              <h1 className="text-2xl font-bold" style={{ color: '#1e293b' }}>Welcome Back</h1>
              <p className="text-sm mt-1" style={{ color: '#64748b' }}>Login to your NayePankh account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="input-label">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    {...register('email')}
                    type="email"
                    className={`input-field input-icon-left ${errors.email ? 'error' : ''}`}
                    placeholder="your.email@example.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.email.message}</p>}
              </div>

              <div>
                <label className="input-label">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className={`input-field input-icon-left input-icon-right ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full justify-center py-3.5 text-base rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm mt-6" style={{ color: '#64748b' }}>
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold hover:underline" style={{ color: '#1a3c6e' }}>
                Register here
              </Link>
            </p>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-start gap-2 text-xs" style={{ color: '#64748b' }}>
                <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#1a3c6e' }} />
                <span>Are you an admin? Use your admin credentials to login.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
