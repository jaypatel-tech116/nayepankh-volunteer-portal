import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart, LogOut, Edit, User, Mail, Phone, MapPin, Building,
  GraduationCap, Clock, Link2, GitBranch, Calendar, MessageSquare, Home,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import volunteerService from '../../services/volunteerService';
import Loader from '../../components/common/Loader';
import StatusBadge from '../../components/volunteer/StatusBadge';
import { formatDate, getInitials } from '../../utils/formatters';

const VolunteerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await volunteerService.getProfile();
        if (res.success) setProfile(res.data);
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-alt">
        <Loader size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  const statusMessages = {
    pending: { emoji: '⏳', title: 'Application Under Review', text: "Your application is being reviewed. We'll notify you soon!" },
    approved: { emoji: '🎉', title: 'Congratulations!', text: "You are an approved volunteer. Start making a difference!" },
    rejected: { emoji: '😔', title: 'Application Not Approved', text: 'Unfortunately, your application was not approved this time.' },
  };
  const statusMsg = statusMessages[profile?.status] || statusMessages.pending;

  return (
    <div className="min-h-screen bg-surface-alt">
      {/* Top Navbar */}
      <nav className="bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="page-container flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-primary truncate">NayePankh</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm text-text-secondary hidden sm:block truncate">
              Welcome, <span className="font-semibold text-text-primary">{user?.name?.split(' ')[0]}</span>
            </span>
            <Link
              to="/"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-text-secondary hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" /> <span>Home</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-error hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="page-container py-6 sm:py-8 max-w-5xl">
        <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-lg border ${
          profile?.status === 'approved' ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200' :
          profile?.status === 'rejected' ? 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200' :
          'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
        }`}>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">
            Welcome back, {profile?.fullName?.split(' ')[0]}! 👋
          </h2>
          <p className="text-text-secondary">{statusMsg.text}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <div className="card-elevated p-4 sm:p-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center text-white text-2xl font-bold mb-4">
                {getInitials(profile?.fullName)}
              </div>
              <h3 className="text-lg font-bold text-text-primary">{profile?.fullName}</h3>
              <p className="text-text-secondary text-sm">{profile?.email}</p>
              <p className="text-text-secondary text-sm">{profile?.college}</p>

              <div className="mt-4">
                <StatusBadge status={profile?.status} />
              </div>

              <div className="mt-4 text-xs text-text-secondary flex items-center justify-center gap-1">
                <Calendar className="w-3 h-3" />
                Registered {formatDate(profile?.registeredAt)}
              </div>

              {profile?.adminNote && profile?.status === 'rejected' && (
                <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200">
                  <div className="flex items-center gap-1 text-xs font-medium text-red-700 mb-1">
                    <MessageSquare className="w-3 h-3" /> Admin Note
                  </div>
                  <p className="text-xs text-red-600">{profile.adminNote}</p>
                </div>
              )}

              <Link
                to="/dashboard/edit"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-primary border-2 border-primary rounded-xl hover:bg-primary hover:text-white transition-all"
              >
                <Edit className="w-4 h-4" /> Edit Profile
              </Link>
            </div>

            {/* Skills */}
            <div className="card-elevated p-4 sm:p-6">
              <h4 className="text-sm font-semibold text-text-primary mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {(profile?.skills || []).map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Personal Details */}
            <div className="card-elevated p-4 sm:p-6">
              <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Personal Details
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: User, label: 'Full Name', value: profile?.fullName },
                  { icon: Mail, label: 'Email', value: profile?.email },
                  { icon: Phone, label: 'Phone', value: profile?.phone },
                  { icon: MapPin, label: 'City', value: `${profile?.city}, ${profile?.state}` },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-surface-alt">
                    <item.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-text-secondary">{item.label}</p>
                      <p className="text-sm font-medium text-text-primary">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Details */}
            <div className="card-elevated p-4 sm:p-6">
              <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" /> Academic Details
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Building, label: 'College', value: profile?.college },
                  { icon: GraduationCap, label: 'Degree', value: profile?.degree },
                  { icon: Calendar, label: 'Year of Study', value: profile?.yearOfStudy },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-surface-alt">
                    <item.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-text-secondary">{item.label}</p>
                      <p className="text-sm font-medium text-text-primary">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Volunteer Preferences */}
            <div className="card-elevated p-4 sm:p-6">
              <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" /> Volunteer Preferences
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-text-secondary mb-2">Areas of Interest</p>
                  <div className="flex flex-wrap gap-2">
                    {(profile?.areasOfInterest || []).map((area) => (
                      <span key={area} className="px-3 py-1 bg-secondary/10 text-secondary rounded-lg text-xs font-medium">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-alt">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-text-secondary">Available Hours</p>
                    <p className="text-sm font-medium text-text-primary">{profile?.availableHours}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Motivation</p>
                  <p className="text-sm text-text-primary bg-surface-alt p-3 rounded-xl leading-relaxed">{profile?.motivation}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {(profile?.linkedinUrl || profile?.githubUrl) && (
              <div className="card-elevated p-4 sm:p-6">
                <h4 className="text-lg font-semibold text-text-primary mb-4">Social Links</h4>
                <div className="flex flex-wrap gap-3">
                  {profile?.linkedinUrl && (
                    <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors">
                      <Link2 className="w-4 h-4" /> LinkedIn
                    </a>
                  )}
                  {profile?.githubUrl && (
                    <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                      <GitBranch className="w-4 h-4" /> GitHub
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
