// import React from "react";
// import BreadCrumb from "../components/BreadCrumb";
// import Meta from "../components/Meta";
// import { Link } from "react-router-dom";
// import Container from "../components/Container";
// import CustomInput from "../components/CustomInput";
// const Signup = () => {
//   return (
//     <>
//       <Meta title={"Sign Up"} />
//       <BreadCrumb title="Sign Up" />
//       <Container class1="login-wrapper py-5 home-wrapper-2">
//         <div className="row">
//           <div className="col-12">
//             <div className="auth-card">
//               <h3 className="text-center mb-3">Sign Up</h3>
//               <form action="" className="d-flex flex-column gap-15">
//                 <CustomInput type="text" name="name" placeholder="Name" />
//                 <CustomInput type="email" name="email" placeholder="Email" />
//                 <CustomInput
//                   type="tel"
//                   name="mobile"
//                   placeholder="Mobile Number"
//                 />
//                 <CustomInput
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                 />
//                 <div>
//                   <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
//                     <button className="button border-0">Sign Up</button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default Signup;

import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { fetchAuth, fetchRegister, selectIsAuth } from '../redux/slices/auth';

 const Signup = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    // dispatch(fetchAuth(values));
    const data = await dispatch(fetchRegister(values));

    if(!data.payload) {
     return alert('Не удалось зарегистрироваться');
    }
    if('token' in data.payload) {
     window.localStorage.setItem('token', data.payload.token);
    }
 };

//  if(isAuth) {
//   return <Navigate to="/" />
//  }

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-15">
                {/* <CustomInput
                 type="text" 
                 name="name"
                 placeholder="Name" 
                 {... register('fullName', { required: 'Укажите fullName' })}
                 /> */}
                 <TextField
                  error={Boolean(errors.firstname?.message)}
                  helperText={errors.firstname?.message}
                  {... register('firstname', { required: 'Укажите fisrtName' })}
                //   className={styles.field} 
                label="First Name" 
                // fullWidth 
                  />
                 <TextField
                  error={Boolean(errors.lastname?.message)}
                  helperText={errors.lastname?.message}
                  {... register('lastname', { required: 'Укажите lastName' })}
                //   className={styles.field} 
                label="Last Name" 
                // fullWidth 
                  />
                {/* <CustomInput 
                type="email" 
                name="email" 
                placeholder="Email"
                {... register('email', { required: 'Укажите почту' })} 
                /> */}
                 <TextField
                  error={Boolean(errors.email?.message)}
                  helperText={errors.email?.message}
                  {... register('email', { required: 'Укажите почту' })}
                   type="email"
                    // className={styles.field} 
                    label="E-Mail" 
                    // fullWidth 
                  />
               
                {/* <CustomInput
                  type="tel"
                  name="mobile"
                  {... register('mobile', { required: 'Укажите mobile' })}
                  placeholder="Mobile Number"
                /> */}
                <TextField 
                 error={Boolean(errors.password?.message)}
                 helperText={errors.password?.message}
                 {... register('mobile', { required: 'Укажите mobile number' })}
                //   type="number"
                //  className={styles.field} 
                label="Mobile" 
                // fullWidth 
                 />


               <TextField 
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {... register('password', { required: 'Укажите password' })}
                type="password"
                //  className={styles.field} 
                label="Пароль" 
                // fullWidth 
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button  type="submit" className="button border-0">Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;