import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {
  Heart, User, Mail, Lock, Phone, MapPin, Building,
  GraduationCap, Lightbulb, Clock, Link2, GitBranch,
  ChevronRight, ChevronLeft, Check, Eye, EyeOff, ArrowRight,
} from 'lucide-react';
import { registerSchema } from '../../schemas/registerSchema';
import { useAuth } from '../../hooks/useAuth';
import { INDIAN_STATES, SKILLS_OPTIONS, AREAS_OF_INTEREST, YEAR_OPTIONS, HOURS_OPTIONS } from '../../utils/constants';
import { getPasswordStrength } from '../../utils/validators';

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Academic Info', icon: GraduationCap },
  { id: 3, title: 'Volunteer Info', icon: Heart },
];

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { isAuthenticated, isAdmin, register: registerUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(isAdmin ? '/admin/dashboard' : '/dashboard', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '', email: '', password: '', confirmPassword: '',
      phone: '', city: '', state: '',
      college: '', degree: '', yearOfStudy: '',
      skills: [], areasOfInterest: [], motivation: '',
      availableHours: '', linkedinUrl: '', githubUrl: '',
    },
  });

  const password = watch('password', '');
  const motivation = watch('motivation', '');
  const selectedSkills = watch('skills', []);
  const selectedAreas = watch('areasOfInterest', []);
  const passwordStrength = getPasswordStrength(password);

  const step1Fields = ['fullName', 'email', 'password', 'confirmPassword', 'phone', 'city', 'state'];
  const step2Fields = ['college', 'degree', 'yearOfStudy'];

  const handleNext = async () => {
    const fields = currentStep === 1 ? step1Fields : step2Fields;
    const valid = await trigger(fields);
    if (valid) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => setCurrentStep((prev) => prev - 1);

  const toggleCheckbox = (field, value) => {
    const current = getValues(field) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setValue(field, updated, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const { confirmPassword, ...submitData } = data;
      const res = await registerUser(submitData);
      if (res.success) {
        setShowSuccess(true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Registration failed';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f8fafc' }}>
        <div className="bg-white rounded-3xl p-10 shadow-2xl text-center max-w-md w-full animate-fade-in-up">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
            <Check className="w-10 h-10" style={{ color: '#22c55e' }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#1e293b' }}>Registration Successful! 🎉</h2>
          <p className="mb-8" style={{ color: '#64748b' }}>
            Your volunteer application has been submitted. Our team will review it shortly.
          </p>
          <Link
            to="/login"
            className="btn-primary w-full justify-center py-3 text-base rounded-xl"
          >
            Login to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-2/5 gradient-hero hero-pattern relative flex-col justify-center p-12">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">NayePankh Foundation</span>
          </Link>

          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Mission to{' '}
            <span style={{ color: '#f97316' }}>Empower Students</span>
          </h2>
          <p className="text-white/70 leading-relaxed mb-10">
            Become a part of India's growing community of student volunteers. 
            Together we can make education accessible and opportunities abundant.
          </p>

          <div className="space-y-4">
            {[
              'Gain valuable mentoring experience',
              'Develop leadership skills',
              'Make a real social impact',
              'Join a community of 500+ volunteers',
              'Get a certificate of volunteering',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3" style={{ color: '#f97316' }} />
                </div>
                <span className="text-white/80 text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          <blockquote className="mt-12 border-l-4 pl-4" style={{ borderColor: '#f97316' }}>
            <p className="text-white/70 italic text-sm">
              "The best way to find yourself is to lose yourself in the service of others."
            </p>
            <cite className="text-white/50 text-xs mt-2 block">— Mahatma Gandhi</cite>
          </blockquote>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold" style={{ color: '#1a3c6e' }}>NayePankh Foundation</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold mb-1" style={{ color: '#1e293b' }}>Register as Volunteer</h1>
          <p className="text-sm mb-8" style={{ color: '#64748b' }}>Fill in your details to join our community</p>

          {/* Progress Bar */}
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center justify-between mb-2 sm:hidden">
              <span className="text-xs font-medium" style={{ color: '#1a3c6e' }}>Step {currentStep} of 3</span>
              <span className="text-xs" style={{ color: '#64748b' }}>{steps[currentStep - 1].title}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                      currentStep > step.id
                        ? 'bg-success text-white'
                        : currentStep === step.id
                        ? 'gradient-primary text-white shadow-lg'
                        : 'bg-gray-200'
                    }`}
                    style={currentStep <= step.id && currentStep !== step.id ? { color: '#64748b' } : undefined}
                  >
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <span className="text-xs font-medium hidden sm:block" style={{ color: currentStep === step.id ? '#1a3c6e' : '#64748b' }}>
                    {step.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-1 sm:mx-2 rounded-full ${currentStep > step.id ? 'bg-success' : 'bg-gray-200'}`} />
                )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* STEP 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: '#1e293b' }}>
                  <User className="w-5 h-5" style={{ color: '#1a3c6e' }} /> Personal Information
                </h3>

                {/* Full Name */}
                <div>
                  <label className="input-label">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input {...register('fullName')} className={`input-field input-icon-left ${errors.fullName ? 'error' : ''}`} placeholder="Enter your full name" />
                  </div>
                  {errors.fullName && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.fullName.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="input-label">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input {...register('email')} type="email" className={`input-field input-icon-left ${errors.email ? 'error' : ''}`} placeholder="your.email@example.com" />
                  </div>
                  {errors.email && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="input-label">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className={`input-field input-icon-left input-icon-right ${errors.password ? 'error' : ''}`}
                      placeholder="Min 8 chars, 1 uppercase, 1 number"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span style={{ color: '#64748b' }}>Password strength</span>
                        <span style={{ color: passwordStrength.color }} className="font-medium">{passwordStrength.label}</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${passwordStrength.strength}%`, backgroundColor: passwordStrength.color }} />
                      </div>
                    </div>
                  )}
                  {errors.password && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="input-label">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      {...register('confirmPassword')}
                      type={showConfirm ? 'text' : 'password'}
                      className={`input-field input-icon-left input-icon-right ${errors.confirmPassword ? 'error' : ''}`}
                      placeholder="Re-enter your password"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.confirmPassword.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="input-label">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input {...register('phone')} className={`input-field input-icon-left ${errors.phone ? 'error' : ''}`} placeholder="10-digit mobile number" maxLength={10} />
                  </div>
                  {errors.phone && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.phone.message}</p>}
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">City *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input {...register('city')} className={`input-field input-icon-left ${errors.city ? 'error' : ''}`} placeholder="Your city" />
                    </div>
                    {errors.city && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.city.message}</p>}
                  </div>
                  <div>
                    <label className="input-label">State *</label>
                    <select {...register('state')} className={`input-field ${errors.state ? 'error' : ''}`}>
                      <option value="">Select state</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.state.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Academic Info */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: '#1e293b' }}>
                  <GraduationCap className="w-5 h-5" style={{ color: '#1a3c6e' }} /> Academic Information
                </h3>

                <div>
                  <label className="input-label">College/University Name *</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input {...register('college')} className={`input-field input-icon-left ${errors.college ? 'error' : ''}`} placeholder="Your college name" />
                  </div>
                  {errors.college && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.college.message}</p>}
                </div>

                <div>
                  <label className="input-label">Degree/Course *</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input {...register('degree')} className={`input-field input-icon-left ${errors.degree ? 'error' : ''}`} placeholder="e.g., B.Tech, BCA, MBA" />
                  </div>
                  {errors.degree && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.degree.message}</p>}
                </div>

                <div>
                  <label className="input-label">Year of Study *</label>
                  <select {...register('yearOfStudy')} className={`input-field ${errors.yearOfStudy ? 'error' : ''}`}>
                    <option value="">Select year</option>
                    {YEAR_OPTIONS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  {errors.yearOfStudy && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.yearOfStudy.message}</p>}
                </div>
              </div>
            )}

            {/* STEP 3: Volunteer Info */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: '#1e293b' }}>
                  <Heart className="w-5 h-5" style={{ color: '#1a3c6e' }} /> Volunteer Information
                </h3>

                {/* Skills */}
                <div>
                  <label className="input-label">Skills * (Select all that apply)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {SKILLS_OPTIONS.map((skill) => (
                      <label
                        key={skill}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm ${
                          selectedSkills.includes(skill)
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ color: selectedSkills.includes(skill) ? '#1a3c6e' : '#64748b' }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => toggleCheckbox('skills', skill)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedSkills.includes(skill) ? 'bg-primary border-primary' : 'border-gray-300'
                        }`}>
                          {selectedSkills.includes(skill) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        {skill}
                      </label>
                    ))}
                  </div>
                  {errors.skills && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.skills.message}</p>}
                </div>

                {/* Areas of Interest */}
                <div>
                  <label className="input-label">Areas of Interest * (Select all that apply)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {AREAS_OF_INTEREST.map((area) => (
                      <label
                        key={area}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm ${
                          selectedAreas.includes(area)
                            ? 'border-secondary bg-secondary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ color: selectedAreas.includes(area) ? '#f97316' : '#64748b' }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedAreas.includes(area)}
                          onChange={() => toggleCheckbox('areasOfInterest', area)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedAreas.includes(area) ? 'bg-secondary border-secondary' : 'border-gray-300'
                        }`}>
                          {selectedAreas.includes(area) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        {area}
                      </label>
                    ))}
                  </div>
                  {errors.areasOfInterest && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.areasOfInterest.message}</p>}
                </div>

                {/* Motivation */}
                <div>
                  <label className="input-label">Why do you want to volunteer? *</label>
                  <textarea
                    {...register('motivation')}
                    rows={4}
                    className={`input-field resize-none ${errors.motivation ? 'error' : ''}`}
                    placeholder="Share your motivation for joining NayePankh Foundation (minimum 50 characters)..."
                  />
                  <div className="flex justify-between mt-1">
                    {errors.motivation ? (
                      <p className="text-xs" style={{ color: '#ef4444' }}>{errors.motivation.message}</p>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs" style={{ color: motivation.length >= 50 ? '#22c55e' : '#64748b' }}>
                      {motivation.length}/50 min
                    </span>
                  </div>
                </div>

                {/* Available Hours */}
                <div>
                  <label className="input-label">Available Hours per Week *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                    {HOURS_OPTIONS.map((option) => (
                      <label
                        key={option}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium ${
                          watch('availableHours') === option
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-gray-200 hover:border-gray-300 text-text-secondary'
                        }`}
                      >
                        <input type="radio" {...register('availableHours')} value={option} className="sr-only" />
                        <Clock className="w-4 h-4" />
                        {option}
                      </label>
                    ))}
                  </div>
                  {errors.availableHours && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.availableHours.message}</p>}
                </div>

                {/* Optional Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">LinkedIn URL (Optional)</label>
                    <div className="relative">
                      <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input {...register('linkedinUrl')} className={`input-field input-icon-left ${errors.linkedinUrl ? 'error' : ''}`} placeholder="https://linkedin.com/in/..." />
                    </div>
                    {errors.linkedinUrl && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.linkedinUrl.message}</p>}
                  </div>
                  <div>
                    <label className="input-label">GitHub URL (Optional)</label>
                    <div className="relative">
                      <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input {...register('githubUrl')} className={`input-field input-icon-left ${errors.githubUrl ? 'error' : ''}`} placeholder="https://github.com/..." />
                    </div>
                    {errors.githubUrl && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.githubUrl.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-gray-200 form-actions-sticky sm:static sm:bg-transparent sm:p-0">
              {currentStep > 1 ? (
                <button type="button" onClick={handlePrev} className="flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-xl hover:bg-gray-100 transition-colors" style={{ color: '#64748b' }}>
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
              ) : (
                <div className="hidden sm:block" />
              )}

              {currentStep < 3 ? (
                <button type="button" onClick={handleNext} className="btn-primary rounded-xl px-8 py-3 w-full sm:w-auto">
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary rounded-xl px-8 py-3 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: '#64748b' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: '#1a3c6e' }}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
