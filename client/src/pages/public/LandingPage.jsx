import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Users, MapPin, BookOpen, Award, ArrowRight, Star,
  GraduationCap, Lightbulb, Briefcase, Megaphone, Target,
  CheckCircle, ChevronRight,
} from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useAuth } from '../../hooks/useAuth';
import { FOCUS_AREAS, TESTIMONIALS, IMPACT_STATS } from '../../utils/constants';

const iconMap = {
  GraduationCap, Lightbulb, Briefcase, Megaphone, Target, Users,
};

// Animated Counter Component
const Counter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Reveal on scroll component
const Reveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};

const LandingPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const dashboardPath = isAdmin ? '/admin/dashboard' : '/dashboard';

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ======== HERO SECTION ======== */}
      {/* ======== HERO SECTION ======== */}
      <section id="hero" className="relative min-h-screen flex items-center gradient-hero hero-pattern overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl" />

        <div className="relative page-container py-28 sm:py-32 md:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 animate-fade-in">
              <Heart className="w-4 h-4 text-secondary" />
              <span className="text-white/90 text-xs sm:text-sm font-medium">NayePankh Foundation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 sm:mb-6 animate-fade-in-up">
              Give Wings to{' '}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Someone's Dream
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-8 sm:mb-10 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Join NayePankh Foundation as a volunteer and help us empower the next generation
              of students across India. Together, we can build a brighter future.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {isAuthenticated ? (
                <Link
                  to={dashboardPath}
                  className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-lg animate-pulse-glow text-center"
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-lg animate-pulse-glow text-center"
                >
                  Register as Volunteer
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
              <a
                href="#about"
                className="btn-outline text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-center"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {IMPACT_STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center"
              >
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-white/70 text-xs sm:text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== ABOUT SECTION ======== */}
      <section id="about" className="py-16 sm:py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div className="relative">
                <div className="w-full aspect-[4/3] rounded-3xl gradient-primary flex items-center justify-center overflow-hidden shadow-2xl">
                  <div className="text-center p-8">
                    <Heart className="w-20 h-20 text-white/30 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white">NayePankh</h3>
                    <p className="text-white/60">Foundation</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-3xl -z-10" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div>
                <span className="section-badge" style={{ color: '#f97316' }}>About Us</span>
                <h2 className="section-title mt-2 mb-4 sm:mb-6" style={{ color: '#1e293b' }}>
                  Empowering Students, Transforming Lives
                </h2>
                <p className="leading-relaxed mb-6" style={{ color: '#64748b' }}>
                  NayePankh Foundation is a dedicated Indian NGO committed to empowering underprivileged
                  and aspiring students by providing them with mentorship, internships, skill development,
                  and real-world opportunities that help them grow, learn, and contribute to society.
                </p>
                <p className="leading-relaxed mb-8" style={{ color: '#64748b' }}>
                  We believe that every student deserves a fair chance at success, regardless of their
                  background. Through our volunteer-driven programs, we connect passionate individuals
                  with students who need guidance and support to achieve their dreams.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Student-Centric', 'Volunteer-Driven', 'Impact-Focused'].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-xl text-sm font-medium"
                      style={{ backgroundColor: 'rgba(26, 60, 110, 0.1)', color: '#1a3c6e' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ======== MISSION & VISION ======== */}
      <section id="mission" className="py-20 md:py-28" style={{ backgroundColor: '#f8fafc' }}>
        <div className="page-container">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: '#f97316' }}>Our Purpose</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: '#1e293b' }}>
                Mission & Vision
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal delay={100}>
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 card-hover h-full">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1e293b' }}>Our Mission</h3>
                <p className="leading-relaxed" style={{ color: '#64748b' }}>
                  To empower underprivileged and aspiring students by providing them with mentorship,
                  internships, skill development, and real-world opportunities. We strive to bridge
                  the gap between potential and opportunity, ensuring every student can reach their
                  full potential.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 card-hover h-full">
                <div className="w-14 h-14 rounded-2xl gradient-secondary flex items-center justify-center mb-6">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1e293b' }}>Our Vision</h3>
                <p className="leading-relaxed" style={{ color: '#64748b' }}>
                  A society where every student gets an equal opportunity to learn, grow, and succeed.
                  We envision a future where a student's background doesn't determine their future,
                  where talent is nurtured, and dreams are given wings to fly.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ======== FOCUS AREAS ======== */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#ffffff' }}>
        <div className="page-container">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: '#f97316' }}>What We Do</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: '#1e293b' }}>
                Our Focus Areas
              </h2>
              <p className="mt-4" style={{ color: '#64748b' }}>
                We work across multiple domains to create a comprehensive support system for students.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOCUS_AREAS.map((area, i) => {
              const Icon = iconMap[area.icon] || BookOpen;
              return (
                <Reveal key={area.title} delay={i * 100}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 card-hover h-full">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(26, 60, 110, 0.1)' }}>
                      <Icon className="w-6 h-6" style={{ color: '#1a3c6e' }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#1e293b' }}>{area.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{area.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======== IMPACT STATS ======== */}
      <section id="impact" className="py-20 md:py-28 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: '#f97316' }}>Our Impact</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                Numbers That Speak
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {IMPACT_STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 150}>
                <div className="text-center p-6 glass rounded-2xl">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-secondary/20 flex items-center justify-center mb-4">
                    {i === 0 && <Users className="w-7 h-7 text-secondary" />}
                    {i === 1 && <MapPin className="w-7 h-7 text-secondary" />}
                    {i === 2 && <GraduationCap className="w-7 h-7 text-secondary" />}
                    {i === 3 && <Award className="w-7 h-7 text-secondary" />}
                  </div>
                  <p className="text-3xl md:text-4xl font-extrabold text-white">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-white/60 text-sm mt-2">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======== TESTIMONIALS ======== */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#ffffff' }}>
        <div className="page-container">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: '#f97316' }}>Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: '#1e293b' }}>
                What Our Volunteers Say
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 150}>
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 card-hover h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6 flex-1 italic" style={{ color: '#64748b' }}>
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
                      {t.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#1e293b' }}>{t.name}</p>
                      <p className="text-xs" style={{ color: '#64748b' }}>{t.college}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CTA SECTION ======== */}
      <section className="py-20 md:py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <div className="relative page-container text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Ready to Make a{' '}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Difference?
              </span>
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of passionate volunteers who are transforming student lives across India.
              Your journey starts with a single step.
            </p>
            {isAuthenticated ? (
              <Link
                to={dashboardPath}
                className="inline-flex items-center gap-2 bg-white text-primary px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                Go to Dashboard
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-white text-primary px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                Register Now
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
