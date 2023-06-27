import React from 'react';
import { guardValue, formatNumber, formatURL } from '../utils/Utils';

const CompanyInfoPopup = ({ company, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div> {/* Backdrop */}
      <div className="bg-white rounded-lg p-6 shadow-md outline-8 m-4 text-gray-700 relative z-10">
        <div>
          <h3 className="text-xl font-semibold mb-2">{guardValue(company.N_COMPANY_T)}</h3>
          <h3 className="text-lg font-semibold mb-2">{guardValue(company.N_COMPANY_E)}</h3>
          <p>Name (ชื่อ): {guardValue(company.N_name)}</p>
          <p>Shortname (ชื่อย่อ): {guardValue(company.N_shortname)}</p>
          <p>Fullname (ชื่อเต็ม): {guardValue(company.N_fullname)}</p>
          <p>Market Cap (มูลค่า): {formatNumber(company.marketcap, '??')} ฿</p>
          <p>Type (ประเภท):{guardValue(company.F_TYPE)}</p><br />
        </div>
        <div className="overflow-y-auto max-h-48 bg-gray-100">
          <h3 className="font-semibold mb-2">Business detail</h3>
          <p className="indent-6">{guardValue(company.N_BUSINESS_TYPE_E)}</p><br />
          <h3 className="font-semibold mb-2">รายละเอียดธุรกิจ</h3>
          <p className="indent-6">{guardValue(company.N_BUSINESS_TYPE_T)}</p>
        </div>
        <div className="flex flex-row justify-center items-center w-full mt-6 space-x-4">
          {company.N_URL ?
            <a href={formatURL(company.N_URL)} target="_blank" className='flex'>
              <button className="bg-blue-500 hover:bg-blue-700 text-white w-auto font-medium py-2 px-4 rounded">
                ดูเว็บไซต์
              </button>
            </a>
            : <></>}
          <button className="bg-red-500 hover:bg-red-600 text-white rounded w-auto flex px-4 py-2" onClick={onClose}>
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoPopup;
