import React from 'react';
import { FaFileCode } from 'react-icons/fa';

const HomePage = ()=> {
  return (
    <div className="flex flex-col items-center mt-36 h-full space-y-2 px-4 text-center">
      <div className="text-7xl text-gray-700 p-4"><FaFileCode/></div>
      <h2 className="font-bold text-3xl p-2">Welcome</h2>
      <p  className="pb-5">นี่คือบททดสอบสำหรับการคัดเลือกเข้าสู่ Frontend programmer</p>
      <p>(I) ออกแบบเเละสร้างหน้าเว็บแสดงข้อมูล</p>
      <p>(II) สร้างฟอร์มสำหรับลงทะเบียน</p>
    </div>
  );
}
export default HomePage;