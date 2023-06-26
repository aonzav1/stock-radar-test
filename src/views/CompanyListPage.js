//{/type=(.*)/}

import React, { useState, useEffect } from 'react';
import {MockData} from '../placeholder/MockData';

const itemsPerPage = 25;

const  CompanyListPage =() => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = MockData.slice(startIndex, endIndex);
    setPaginatedData(slicedData);
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="h-screen w-screen bg-red-300 ">
      <h1>Company List</h1>
      <div>
        {paginatedData.map((company) => (
          <div key={company.N_name}>
            <p>{company.N_COMPANY_T}</p>
            <p>Market Cap: {company.marketcap}</p>
          </div>
        ))}
      </div>
      <div>
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}>Prev</button>
        )}
        {currentPage * itemsPerPage < MockData.length && (
          <button onClick={handleNextPage}>Next</button>
        )}
      </div>
    </div>
  );
};

export default CompanyListPage;