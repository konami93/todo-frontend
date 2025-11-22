export default function TaskSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-300 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="mt-1 h-5 w-5 bg-gray-300 rounded"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="flex items-center mt-2 space-x-4">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <div className="h-4 bg-gray-200 rounded w-14"></div>
        </div>
      </div>
    </div>
  );
}

