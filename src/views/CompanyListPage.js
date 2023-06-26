import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { guardValue, formatNumber } from '../utils/Utils';

const itemsPerPage = 15;

const CompanyListPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);
  const [companyListData, setCompanyListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);

  //Fetch for Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        'https://stockradars.co/assignment/data.php',
      );
      setCompanyListData(result.data);
      setCurrentPage(1);
      setIsLoading(false);
      console.log("FINISH FETCH");
    };
    fetchData();
  }, []);

  //From URI we don't know its query interface, but we do know that there's few data. So we do pagination locally
  useEffect(() => {
    if (companyListData == null)
      return;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = companyListData?.slice(startIndex, endIndex);
    setPaginatedData(slicedData);
  }, [currentPage]);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Company Page</h1>
      <div className="flex">
        <div className="w-1/4">
          {isLoading ? <>Loading...</> :
          <div className="container mx-auto px-4 py-8">
            <h1>Company List</h1>
            <div>
              {paginatedData.map((company) => (
                <div key={company.N_name} className={`p-4 border rounded cursor-pointer ${selectedCompany && selectedCompany.N_name === company.N_name ? 'bg-gray-100' : ''}`} onClick={() => handleCompanyClick(company)}>
                  <p>{guardValue(company.N_COMPANY_T)}</p>
                  <p>Market Cap: {formatNumber(company.marketcap,'??')}</p>
                </div>
              ))}
            </div>
            <div>
              {currentPage > 1 && (
                <button onClick={handlePreviousPage}>Prev</button>
              )}
              {currentPage * itemsPerPage < companyListData?.length && (
                <button onClick={handleNextPage}>Next</button>
              )}
            </div>
          </div>
          }
        </div>
        <div className="w-3/4 ml-8">
          {selectedCompany ? (
            <div>
              <h3 className="text-2xl font-semibold mb-2">{guardValue(selectedCompany.N_COMPANY_T)}</h3>
              <h3 className="text-xl font-semibold mb-4">{guardValue(selectedCompany.N_COMPANY_E)}</h3>
              <p>Name: {guardValue(selectedCompany.N_name)}</p>
              <p>Shortname: {guardValue(selectedCompany.N_shortname)}</p>
              <p>Fullname: {guardValue(selectedCompany.N_fullname)}</p>
              <p>Market Cap: {formatNumber(selectedCompany.marketcap,'??')}</p>
              <p>URL: {guardValue(selectedCompany.N_URL)}</p>
              <p>Type: {guardValue(selectedCompany.F_TYPE)}</p>
              <p>Business Type (EN): {guardValue(selectedCompany.N_BUSINESS_TYPE_E)}</p>
              <p>Business Type (TH): {guardValue(selectedCompany.N_BUSINESS_TYPE_T)}</p>
            </div>
          ) : (
            <p>เลือกรายชื่อข้างซ้ายเพื่อดูข้อมูลเพิ่มเติม</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyListPage;