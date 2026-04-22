const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card">
          <div className="h-48 skeleton" />
          <div className="p-4 space-y-3">
            <div className="h-6 w-3/4 skeleton rounded" />
            <div className="flex justify-between">
              <div className="h-4 w-16 skeleton rounded" />
              <div className="h-4 w-20 skeleton rounded" />
            </div>
            <div className="h-4 w-full skeleton rounded" />
            <div className="h-10 w-full skeleton rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;