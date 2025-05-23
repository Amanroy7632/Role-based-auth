import React from "react";

function Pagination({metaData,setCurrentPage,currentPage}) {
    const handleNext=()=>{
       if (metaData.totalPages>currentPage) {
         setCurrentPage(currentPage+1);
       }
    }
    const handlePrev=()=>{
        if (metaData?.totalPages>=currentPage&&currentPage>1) {
            setCurrentPage(currentPage-1);
        }
    }
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-700">
        Showing <span className="font-medium">1</span> to{" "}
        <span className="font-medium">{metaData?.total<metaData?.pageLimit?metaData.total:metaData?.pageLimit}</span> of{" "}
        <span className="font-medium">{metaData?.total}</span> results
      </div>
      <div className="flex space-x-2">
        <button onClick={handlePrev} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
          Previous
        </button>
        <button onClick={handleNext} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
