import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { guardValue, formatNumber, formatURL } from '../utils/Utils';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import Swal from 'sweetalert2';
import CompanyInfoPopup from '../components/CompanyInfoPopup';

const itemsPerPage = 10;

const CompanyListPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);
  const [companyListData, setCompanyListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(
    navigator.userAgent
  );

  //Fetch for Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios(
          'https://stockradars.co/assignment/data.php',
        );
        if (result.data != null) {
          setCompanyListData(result.data);
          setTotalPage(Math.ceil(result.data.length / itemsPerPage));
          setCurrentPage(1);
          if (result.data.length > 0 && !isMobile)
            setSelectedCompany(result.data[0]);
        }
        setIsLoading(false);
      } catch (e) {
        let timerInterval
        Swal.fire({
          title: 'Error!',
          html: "โหลดข้อมูลไม่สำเร็จ<br/>กลับไปหน้าหลักใน <b></b> วินาทั",
          timer: 5000,
          icon: "error",
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Math.ceil(Swal.getTimerLeft()/1000)
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          window.location.href="../"
        })
      }
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

  const handleClosePopup = () => {
    setSelectedCompany(null);
  };

  function IsSelected(companyName) {
    return selectedCompany && selectedCompany.N_name === companyName;
  }

  return (
    <div className="container mx-auto pb-8 sm:py-8">
      <div className="flex">
        {/* List container */}
        <div className="sm:w-1/3 w-full">
          {isLoading ? <>Loading...</> :
            <div className="container mx-auto">
              <div>
                {paginatedData.map((company) => (
                  <div key={company.N_name} className={`p-4 border rounded cursor-pointer ${IsSelected(company.N_name) ? 'bg-blue-500' : ''}`} onClick={() => handleCompanyClick(company)}>
                    <p className={`font-semibold ${IsSelected(company.N_name) ? "text-white" : "text-gray-700"}`}>{guardValue(company.N_COMPANY_T)}</p>
                    <p className={`${IsSelected(company.N_name) ? "text-white" : "text-gray-700"}`}>{formatNumber(company.marketcap, '??')} ฿</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-row justify-center space-x-6 my-4">
                <button className={`text-xl ${currentPage > 1 ? "text-gray-700" : "text-gray-400"}`} disabled={currentPage <= 1} onClick={handlePreviousPage}><FaArrowCircleLeft /></button>
                <div className="mx-2 text-gray-700">
                  {currentPage} / {totalPage}
                </div>
                <button className={`text-xl ${currentPage < totalPage ? "text-gray-700" : "text-gray-200"}`} disabled={currentPage >= totalPage} onClick={handleNextPage}><FaArrowCircleRight /></button>
              </div>
            </div>
          }
        </div>

        {/* Desktop detail container */}
        <div className="sm:w-2/3 sm:ml-8 hidden sm:block">
          {selectedCompany ? (
            <div className='flex flex-col w-full'>
              <div className="flex flex-row justify-between items-center w-full mb-6">
                <div className="text-gray-700">
                  <h3 className="text-2xl font-semibold mb-2">{guardValue(selectedCompany.N_COMPANY_T)}</h3>
                  <h3 className="text-xl font-semibold">{guardValue(selectedCompany.N_COMPANY_E)}</h3>
                </div>
                {selectedCompany.N_URL ?
                  <a href={formatURL(selectedCompany.N_URL)} target="_blank">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">ดูเว็บไซต์</button>
                  </a> : <></>}
              </div>
              <div className="text-gray-700">
                <p>Name (ชื่อ): {guardValue(selectedCompany.N_name)}</p>
                <p>Shortname (ชื่อย่อ): {guardValue(selectedCompany.N_shortname)}</p>
                <p>Fullname (ชื่อเต็ม): {guardValue(selectedCompany.N_fullname)}</p>
                <p>Market Cap (มูลค่า): {formatNumber(selectedCompany.marketcap, '??')} ฿</p>
                <p>Type (ประเภท): {guardValue(selectedCompany.F_TYPE)}</p><br />

                <h3 className="font-semibold mb-2">Business detail</h3>
                <p className="indent-6">{guardValue(selectedCompany.N_BUSINESS_TYPE_E)}</p><br />
                <h3 className="font-semibold mb-2">รายละเอียดธุรกิจ</h3>
                <p className="indent-6">{guardValue(selectedCompany.N_BUSINESS_TYPE_T)}</p>
              </div>
            </div>
          ) : (
            <p>เลือกรายชื่อข้างซ้ายเพื่อดูข้อมูลเพิ่มเติม</p>
          )}
        
        </div>
      </div>
      
      {/* Mobile detail container */}
      {selectedCompany == null ? <></>:
      <div className='block sm:hidden'>
      <CompanyInfoPopup company={selectedCompany} onClose={handleClosePopup} />
      </div>
      }
    </div>
  );
};

export default CompanyListPage;