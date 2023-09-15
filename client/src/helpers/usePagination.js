import { useMemo, useState } from 'react';

const usePagination = (data) => {

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(() => {
    return (data.length > 0 ? Math.ceil(data.length / 10) : 1)
  }, [data]);

  function currentDataToDisplay(page) {
    const pageNumber = Math.min(Math.max(1, page), totalPages);
    const begin = (pageNumber - 1) * 10;
    const end = begin + 10;
    return data?.slice(begin, end);
  }

  function gotoPage(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => {
      return Math.min(pageNumber, totalPages)
    });
  }

  return { gotoPage, currentDataToDisplay, currentPage, totalPages };

}

export default usePagination;
