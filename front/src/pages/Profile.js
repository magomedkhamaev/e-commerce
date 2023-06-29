import React, { useState } from 'react';
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import { updateProfile } from '../redux/slices/auth';
import {FiEdit} from "react-icons/fi";

let profileSchema = yup.object().shape({
    firstname: yup.string().required("First Name is Required"),
    lastname: yup.string().required("Last Name is Required"),
    email: yup.string().required("Email is Required"),
    mobile: yup.string().required("Mobile is no  Required"),
    
  });

const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.auth?.data);
  const [edit,setEdit] = useState(true);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          firstname: "firstname",
          lastname: "lastname",
          email: "firstname@gmail.com",
          mobile: "23123213",
          
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
          
        //   setShippingInfo(values)
          dispatch(updateProfile(values))
          setEdit(true)
        //   setTimeout(()=> {
        //     checkOutHandler()
        //   }, 300);
        },
      });
    return (
        <>
        <BreadCrumb title="My Profile"/>
        <Container class1='cart-wrapper home-wrapper-2 py-5'>
         <div className='row'>
            <div className='col-12'>
                <FiEdit className='fs-3'  onClick={()=> setEdit(false)}/>
             <form onSubmit={formik.handleSubmit}>

     <div className="mb-3">
    <label htmlFor="example1" className="form-label">First Name</label>
    <input type="text" name='firstname' className="form-control" disabled={edit} id="example1" 
    value={formik.values.firstname} 
    onChange={formik.handleChange('firstname')}
    onBlur={formik.handleBlur('firstname')}
    />
    <div className='error'>{formik.touched.firstname && formik.errors.firstname}</div>
  </div>
  <div className="mb-3">
    <label htmlFor="example2" className="form-label">Last Name</label>
    <input type="text" name='lastname' className="form-control" disabled={edit} id="example2" 
    value={formik.values.lastname} 
    onChange={formik.handleChange('lastname')}
    onBlur={formik.handleBlur('lastname')}
    />
    <div className='error'>{formik.touched.lastname && formik.errors.lastname}</div>
  </div>
  <div class="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name='email' className="form-control" disabled={edit} id="exampleInputEmail1" aria-describedby="emailHelp"
    value={formik.values.email} 
    onChange={formik.handleChange('email')}
    onBlur={formik.handleBlur('email')}
    />
    <div className='error'>{formik.touched.email && formik.errors.email}</div>
  </div>

  <div class="mb-3">
    <label htmlFor="exampleInputEmail2" className="form-label">Mobile No</label>
    <input type="number" name='mobile' className="form-control" disabled={edit} id="exampleInputEmail2"  aria-describedby="emailHelp"
    value={formik.values.mobile} 
    onChange={formik.handleChange('mobile')}
    onBlur={formik.handleBlur('mobile')}
    />
    <div className='error'>{formik.touched.email && formik.errors.email}</div>
  </div>
  {
    edit === false && <button type="submit" className="btn btn-primary">Save</button>
  }
</form>
            </div>
         </div>
        </Container>
        </>
    )
}

export default Profile;