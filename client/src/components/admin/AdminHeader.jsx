import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Bell, Menu, Home } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/formatters';

const AdminHeader = ({ title, subtitle, onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-30 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-1 rounded-xl text-text-primary hover:bg-surface-alt transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-text-primary truncate">
              {title || 'Admin Panel'}
            </h2>
            {subtitle && (
              <p className="text-xs text-text-secondary truncate hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* <button
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-alt flex items-center justify-center text-text-secondary hover:bg-gray-200 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-secondary rounded-full" />
          </button> */}

          <Link
            to="/"
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-text-secondary hover:bg-surface-alt rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl gradient-primary flex items-center justify-center text-white text-xs sm:text-sm font-bold">
              {getInitials(user?.name || 'Admin')}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-text-primary leading-tight">{user?.name}</p>
              <p className="text-xs text-text-secondary">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-error hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
