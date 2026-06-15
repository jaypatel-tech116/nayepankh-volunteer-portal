import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, CheckCircle, Clock, XCircle, Eye, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from '../../components/admin/AdminLayout';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/volunteer/StatusBadge';
import Loader from '../../components/common/Loader';
import adminService from '../../services/adminService';
import { formatShortDate, getMonthName } from '../../utils/formatters';

const CHART_COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminService.getStats();
        if (res.success) setStats(res.data);
      } catch (err) {
        console.error('Error loading stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const pieData = stats ? [
    { name: 'Approved', value: stats.approved },
    { name: 'Pending', value: stats.pending },
    { name: 'Rejected', value: stats.rejected },
  ] : [];

  const barData = (stats?.monthlyRegistrations || []).map((m) => ({
    name: `${getMonthName(m._id.month)} ${m._id.year}`,
    count: m.count,
  }));

  const skillsData = (stats?.topSkills || []).slice(0, 6).map((s) => ({
    name: s._id,
    count: s.count,
  }));

  return (
    <AdminLayout title="Dashboard" subtitle="Overview of volunteer registrations">
      {loading ? (
        <Loader size="lg" text="Loading dashboard..." />
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            <StatCard icon={Users} label="Total Volunteers" value={stats?.total || 0} color="primary" />
            <StatCard icon={CheckCircle} label="Approved" value={stats?.approved || 0} color="success" />
            <StatCard icon={Clock} label="Pending" value={stats?.pending || 0} color="warning" />
            <StatCard icon={XCircle} label="Rejected" value={stats?.rejected || 0} color="error" />
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="card-elevated p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-text-primary mb-4">Status Distribution</h3>
              {stats?.total > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={4} dataKey="value">
                      {pieData.map((_, index) => (
                        <Cell key={index} fill={CHART_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-text-secondary text-sm">No data yet</div>
              )}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-2">
                {pieData.map((entry, i) => (
                  <div key={entry.name} className="flex items-center gap-1.5 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                    <span className="text-text-secondary">{entry.name} ({entry.value})</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-elevated p-4 sm:p-6 lg:col-span-1">
              <h3 className="text-sm sm:text-base font-semibold text-text-primary mb-4">Monthly Registrations</h3>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={50} />
                    <YAxis tick={{ fontSize: 11 }} width={30} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1a3c6e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[220px] flex items-center justify-center text-text-secondary text-sm">No data yet</div>
              )}
            </div>

            <div className="card-elevated p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-text-primary mb-4">Top Skills</h3>
              {skillsData.length > 0 ? (
                <div className="space-y-3">
                  {skillsData.map((skill) => {
                    const max = skillsData[0]?.count || 1;
                    const pct = (skill.count / max) * 100;
                    return (
                      <div key={skill.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-text-secondary font-medium truncate mr-2">{skill.name}</span>
                          <span className="text-text-primary font-bold">{skill.count}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full gradient-primary transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-text-secondary text-sm">No data yet</div>
              )}
            </div>
          </div>

          <div className="card-elevated overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-sm sm:text-base font-semibold text-text-primary flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" /> Recent Registrations
              </h3>
              <Link to="/admin/volunteers" className="text-sm text-primary font-medium hover:underline">
                View All →
              </Link>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block table-responsive">
              <table className="w-full min-w-[640px]">
                <thead className="bg-surface-alt">
                  <tr>
                    {['Name', 'College', 'City', 'Status', 'Date', 'Action'].map((h) => (
                      <th key={h} className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(stats?.recentVolunteers || []).map((v) => (
                    <tr key={v._id} className="hover:bg-surface-alt transition-colors">
                      <td className="px-4 lg:px-6 py-4 text-sm font-medium text-text-primary">{v.fullName}</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-text-secondary">{v.college}</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-text-secondary">{v.city}</td>
                      <td className="px-4 lg:px-6 py-4"><StatusBadge status={v.status} /></td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-text-secondary">{formatShortDate(v.registeredAt)}</td>
                      <td className="px-4 lg:px-6 py-4">
                        <Link to={`/admin/volunteers/${v._id}`} className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline">
                          <Eye className="w-4 h-4" /> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {(!stats?.recentVolunteers || stats.recentVolunteers.length === 0) && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-text-secondary text-sm">
                        No volunteers registered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {(stats?.recentVolunteers || []).map((v) => (
                <div key={v._id} className="p-4 hover:bg-surface-alt/50 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-text-primary truncate">{v.fullName}</p>
                      <p className="text-xs text-text-secondary truncate">{v.college}</p>
                    </div>
                    <StatusBadge status={v.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">{v.city} · {formatShortDate(v.registeredAt)}</span>
                    <Link to={`/admin/volunteers/${v._id}`} className="text-sm text-primary font-medium">
                      View →
                    </Link>
                  </div>
                </div>
              ))}
              {(!stats?.recentVolunteers || stats.recentVolunteers.length === 0) && (
                <div className="p-8 text-center text-text-secondary text-sm">No volunteers registered yet.</div>
              )}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
