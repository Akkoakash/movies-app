import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

const formValidationSchema = yup.object({
  email: yup.string().required("Email").min(5, "Need a longer email 😄"),
  password: yup.string().required("Password")
  .min(8, "Need a longer password ")
  .max(12, "Too much password "),});

export function BasicForm() {
  const history = useHistory();
  const formik = useFormik({
initialValues : {email: "", password:""},
validationSchema : formValidationSchema,
onSubmit:  (values) => {
  
  console.log("onSubmit", values);
  history.push("/movies");
},
});
  return (
  <form onSubmit={formik.handleSubmit}>
    <input 
    type="email" 
    id="email"
    name="email" 
    value={formik.values.email} 
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
      placeholder="email"/>
      <br/>
      {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
      <br/>
    <input 
    type="password" 
    id="password"
    name="password"
    value={formik.values.password} 
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    minlength="8" 
    placeholder="password"/>
    <br/>
    {formik.touched.password && formik.errors.password ? formik.errors.password : ""}
    <br/>
    <button type="submit">Submit</button>
    
    </form>
  );
}
