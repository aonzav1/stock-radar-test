import React from 'react';
import { useForm } from 'react-hook-form';

const FormPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <div>
      <h1>Form Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register('name', { required: 'Name is required' })} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="surname">Surname</label>
          <input type="text" id="surname" {...register('surname', { required: 'Surname is required' })} />
          {errors.surname && <p>{errors.surname.message}</p>}
        </div>
        <div>
          <label htmlFor="tel">Tel</label>
          <input type="tel" id="tel" {...register('tel', { required: 'Tel is required' })} />
          {errors.tel && <p>{errors.tel.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="ref">Ref</label>
          <input type="text" id="ref" {...register('ref', { required: 'Ref is required' })} />
          {errors.ref && <p>{errors.ref.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;