import { Link } from 'react-router-dom';
import { Heart, Mail, MapPin, Phone, Globe, MessageCircle, Camera, Link2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const socialLinks = [
  { icon: Globe, label: 'Website', href: '#' },
  { icon: MessageCircle, label: 'WhatsApp', href: '#' },
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: Link2, label: 'LinkedIn', href: '#' },
];

const Footer = () => {
  return (
    <footer id="footer" className="bg-dark text-white">
      <div className="page-container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-secondary flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">NayePankh</span>
                <span className="text-xs block -mt-1" style={{ color: '#f97316' }}>Foundation</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Giving Wings to Dreams. Empowering underprivileged and aspiring students
              with mentorship, internships, skill development, and real-world opportunities.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-orange-500 hover:scale-105 transition-all"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#f97316' }}>Quick Links</h3>
            <ul className="space-y-2.5">
              {['Home', 'About Us', 'Our Mission', 'Programs', 'Contact'].map((link) => (
                <li key={link}>
                  <Link to="/" className="text-gray-400 text-sm hover:text-white transition-colors inline-block py-0.5">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#f97316' }}>Get Involved</h3>
            <ul className="space-y-2.5">
              {(() => {
                const { isAuthenticated, isAdmin } = useAuth();
                const links = isAuthenticated
                  ? [
                      { label: 'Dashboard', to: isAdmin ? '/admin/dashboard' : '/dashboard' },
                      { label: 'Mentorship Program', to: '/' },
                      { label: 'Donate', to: '/' },
                      { label: 'Partner with Us', to: '/' },
                    ]
                  : [
                      { label: 'Volunteer with Us', to: '/register' },
                      { label: 'Login', to: '/login' },
                      { label: 'Mentorship Program', to: '/' },
                      { label: 'Donate', to: '/' },
                      { label: 'Partner with Us', to: '/' },
                    ];
                return links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-gray-400 text-sm hover:text-white transition-colors inline-block py-0.5">
                      {link.label}
                    </Link>
                  </li>
                ));
              })()}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#f97316' }}>Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#f97316' }} />
                <span className="text-gray-400 text-sm leading-relaxed">
                  NayePankh Foundation, Sector 62, Noida, Uttar Pradesh, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#f97316' }} />
                <a href="mailto:contact@nayepankh.org" className="text-gray-400 text-sm hover:text-white transition-colors">
                  contact@nayepankh.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#f97316' }} />
                <a href="tel:+919876543210" className="text-gray-400 text-sm hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page-container py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} NayePankh Foundation. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1 justify-center">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for a better tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
