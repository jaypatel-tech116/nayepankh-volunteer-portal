const StatCard = ({ icon: Icon, label, value, color = 'primary', suffix = '' }) => {
  const bgMap = {
    primary: 'bg-primary/10',
    success: 'bg-success/10',
    warning: 'bg-warning/10',
    error: 'bg-error/10',
    secondary: 'bg-secondary/10',
  };

  const textMap = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    secondary: 'text-secondary',
  };

  const borderMap = {
    primary: 'border-t-4 border-t-primary',
    success: 'border-t-4 border-t-success',
    warning: 'border-t-4 border-t-warning',
    error: 'border-t-4 border-t-error',
    secondary: 'border-t-4 border-t-secondary',
  };

  return (
    <div className={`card-elevated p-4 sm:p-6 card-hover ${borderMap[color]}`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${bgMap[color]} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${textMap[color]}`} />
        </div>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-text-primary">
        {value}{suffix}
      </p>
      <p className="text-xs sm:text-sm text-text-secondary mt-1">{label}</p>
    </div>
  );
};

export default StatCard;
