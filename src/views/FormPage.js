import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const FormPage = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    const emailParam = urlParams.get('email');
    const telParam = urlParams.get('tel');
    const nameParam = urlParams.get('name');
    const surnameParam = urlParams.get('surname');
    if (refParam) {setValue('ref', refParam);}
    if (emailParam) {setValue('email', emailParam);}
    if (telParam) {setValue('tel', telParam);}
    if (nameParam) {setValue('name', nameParam);}
    if (surnameParam) {setValue('surname', surnameParam);}
  }, [setValue]);

  function DisplayConfirmation(data){
    Swal.fire({
      title: "Confirmation",
      text: 'ยืนยันการส่งแบบฟอร์มหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`ชื่อ-สกุล: ${data.name} ${data.surname}\nEmail: ${data.email}\nเบอร์โทรศัพท์: ${data.tel}\nRef: ${data.ref}`);
        Swal.fire(
          'สำเร็จ!',
          'แบบฟอร์มของคุณได้ถูกส่งเรียบร้อยแล้ว',
          'success'
        )
      }
    })
  }

  const onSubmit = (data) => {
    DisplayConfirmation(data);
    console.log(data);
  };

  const inputFieldStyle = "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 max-w-md mx-auto">แบบฟอร์มสำหรับลงทะเบียน</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block mb-2">ชื่อ</label>
          <input type="text" id="name" {...register('name', { required: 'โปรดป้อนชื่อ' })} className={inputFieldStyle} />
          {errors.name && <p className="text-red-500 mt-2">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label  className="block mb-2">นามสกุล</label>
          <input type="text" id="surname" {...register('surname', { required: 'โปรดป้อนนามสกุล' })} className={inputFieldStyle} />
          {errors.surname && <p className="text-red-500 mt-2">{errors.surname.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">เบอร์โทรศัพท์</label>
          <input type="tel" id="tel" {...register('tel', { required: 'โปรดป้อนเบอร์โทรศัพท์', pattern: { value: /^[0-9]{10}$/, message: 'โปรดป้อนรูปแบบเบอร์โทรศัพท์ที่ถูกต้อง' } })} className={inputFieldStyle} />
          {errors.tel && <p className="text-red-500 mt-2">{errors.tel.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input type="email" id="email" {...register('email', { required: 'โปรดป้อน Email', pattern: { value: /^\S+@\S+$/i, message: 'โปรดป้อนรูปแบบ Email ที่ถูกต้อง' } })} className={inputFieldStyle} />
          {errors.email && <p className="text-red-500 mt-2">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Ref</label>
          <input type="text" id="ref" {...register('ref')} className={inputFieldStyle} />
          {errors.ref && <p className="text-red-500 mt-2">{errors.ref.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
