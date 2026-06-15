import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';

  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isLanding) return;
    const sections = ['hero', 'about', 'mission', 'impact', 'footer'];
    const handleActiveSection = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleActiveSection);
    // run once initially
    handleActiveSection();
    return () => window.removeEventListener('scroll', handleActiveSection);
  }, [isLanding]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
  };

  const scrollToSection = (id) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = isLanding
    ? [
        { label: 'Home', id: 'hero', action: () => scrollToSection('hero') },
        { label: 'About', id: 'about', action: () => scrollToSection('about') },
        { label: 'Mission', id: 'mission', action: () => scrollToSection('mission') },
        { label: 'Impact', id: 'impact', action: () => scrollToSection('impact') },
        { label: 'Contact', id: 'footer', action: () => scrollToSection('footer') },
      ]
    : [];

  const isLightNav = scrolled || !isLanding;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLightNav
            ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100/80'
            : 'bg-transparent'
        }`}
      >
        <div className="page-container">
          <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
            <Link to="/" className="flex items-center gap-2.5 group min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <span className={`text-base sm:text-lg font-bold block leading-tight ${isLightNav ? 'text-primary' : 'text-white'}`}>
                  NayePankh
                </span>
                <span className={`text-[10px] sm:text-xs block -mt-0.5 ${isLightNav ? 'text-text-secondary' : ''}`} style={isLightNav ? { color: '#f97316' } : { color: '#fdba74' }}>
                  Foundation
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className={`text-sm font-medium transition-colors relative py-1 nav-link-underline ${
                    activeSection === link.id ? 'active' : ''
                  } ${
                    isLightNav
                      ? 'text-text-secondary hover:text-primary'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to={isAdmin ? '/admin/dashboard' : '/dashboard'}
                    className="px-5 py-2.5 text-sm font-semibold rounded-xl text-white gradient-primary hover:shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 text-sm font-semibold rounded-xl border-2 border-gray-200 text-text-secondary hover:border-error hover:text-error transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all hover:scale-[1.02] ${
                      isLightNav
                        ? 'text-primary border-2 border-primary hover:bg-primary hover:text-white'
                        : 'text-white border-2 border-white/50 hover:bg-white hover:text-primary'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 text-sm font-semibold rounded-xl text-white gradient-btn hover:shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Register as Volunteer
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-colors ${
                isLightNav
                  ? 'text-primary hover:bg-surface-alt'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="overlay-backdrop lg:hidden" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl lg:hidden transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-primary">NayePankh</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-text-secondary hover:bg-surface-alt"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className={`block w-full text-left px-4 py-3.5 font-medium rounded-xl transition-colors ${
                  activeSection === link.id
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-text-primary hover:bg-surface-alt'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100 space-y-2 bg-surface-alt/50">
            {isAuthenticated ? (
              <>
                <Link
                  to={isAdmin ? '/admin/dashboard' : '/dashboard'}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3.5 text-white font-semibold rounded-xl gradient-primary"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center px-4 py-3.5 text-error font-semibold rounded-xl border-2 border-error/30 bg-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3.5 text-primary font-semibold rounded-xl border-2 border-primary bg-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3.5 text-white font-semibold rounded-xl gradient-btn"
                >
                  Register as Volunteer
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
