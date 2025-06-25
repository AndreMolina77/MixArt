const Skeleton = ({ type = 'text', lines = 3, className = '' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i} 
            className={`h-4 bg-[#F9F3E9] rounded mb-2 last:mb-0 ${i === lines - 1 ? 'w-3/4' : ''}`}
          ></div>
        ));
      
      case 'image':
        return <div className="bg-[#F9F3E9] rounded-lg w-full aspect-square"></div>;
      
      case 'card':
        return (
          <div className="border border-[#E0E0E0] rounded-lg overflow-hidden shadow-sm">
            <div className="bg-[#F9F3E9] w-full aspect-video"></div>
            <div className="p-4">
              <div className="h-5 bg-[#F9F3E9] rounded mb-3 w-3/4"></div>
              <div className="h-4 bg-[#F9F3E9] rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-[#F9F3E9] rounded mb-2 w-1/3"></div>
              <div className="flex justify-between mt-4">
                <div className="h-8 bg-[#F9F3E9] rounded w-20"></div>
                <div className="h-8 bg-[#F9F3E9] rounded w-24"></div>
              </div>
            </div>
          </div>
        );
      
      case 'button':
        return <div className="h-10 bg-[#F9F3E9] rounded-md w-32"></div>;
      
      default:
        return <div className={`bg-[#F9F3E9] rounded ${className}`}></div>;
    }
  };

  return (
    <div className={`animate-pulse ${type === 'text' ? 'space-y-2' : ''}`}>
      {renderSkeleton()}
    </div>
  );
};

export default Skeleton;