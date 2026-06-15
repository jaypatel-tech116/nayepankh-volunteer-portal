const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-[3px]',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div
        className={`${sizeClasses[size]} border-gray-200 border-t-primary rounded-full animate-spin-slow`}
      />
      {text && <p className="text-text-secondary text-sm font-medium">{text}</p>}
    </div>
  );
};

export default Loader;
