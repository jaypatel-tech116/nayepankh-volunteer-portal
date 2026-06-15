import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, CheckCircle, Clock, XCircle,
  FileText, Heart, ChevronLeft, ChevronRight, X,
} from 'lucide-react';
import { useState } from 'react';

const links = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/volunteers', icon: Users, label: 'All Volunteers' },
  { to: '/admin/volunteers?status=approved', icon: CheckCircle, label: 'Approved' },
  { to: '/admin/volunteers?status=pending', icon: Clock, label: 'Pending' },
  { to: '/admin/volunteers?status=rejected', icon: XCircle, label: 'Rejected' },
  { to: '/admin/reports', icon: FileText, label: 'Reports' },
];

const SidebarContent = ({ collapsed, onClose, isMobile }) => {
  const location = useLocation();

  // Custom active check that handles query params correctly
  const isLinkActive = (linkTo) => {
    const [linkPath, linkSearch] = linkTo.split('?');
    const currentPath = location.pathname;
    const currentSearch = location.search;

    if (linkSearch) {
      // For links with query params, match both path and query
      return currentPath === linkPath && currentSearch === `?${linkSearch}`;
    }
    // For regular links, exact path match (except for filtered volunteer pages)
    if (linkPath === '/admin/volunteers') {
      return currentPath === linkPath && !currentSearch;
    }
    return currentPath === linkPath;
  };

  return (
    <>
      <div className={`border-b border-white/10 ${isMobile ? 'p-5' : 'p-6'}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl gradient-secondary flex items-center justify-center flex-shrink-0 shadow-lg">
              <Heart className="w-5 h-5 text-white" />
            </div>
            {(!collapsed || isMobile) && (
              <div className="min-w-0">
                <span className="text-white font-bold text-sm block truncate">NayePankh</span>
                <span className="text-xs block -mt-0.5" style={{ color: '#f97316' }}>Admin Panel</span>
              </div>
            )}
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto no-scrollbar">
        {links.map((link) => {
          const active = isLinkActive(link.to);
          return (
            <NavLink
              key={link.label}
              to={link.to}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {(!collapsed || isMobile) && <span>{link.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};

const AdminSidebar = ({ mobileOpen, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="overlay-backdrop lg:hidden" onClick={onClose} aria-hidden="true" />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-dark flex flex-col lg:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent collapsed={false} onClose={onClose} isMobile />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-dark min-h-screen sticky top-0 transition-all duration-300 flex-shrink-0 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <SidebarContent collapsed={collapsed} onClose={onClose} isMobile={false} />

        <div className="p-4 border-t border-white/10 mt-auto">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors w-full justify-center py-2 rounded-lg hover:bg-white/5"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
