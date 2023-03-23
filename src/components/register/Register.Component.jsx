import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {registerUser} from "../../services/auth.service";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import ContainerComponent from "../../UIkit/Container.Component";
import ButtonComponent from "../../UIkit/Button.Component";

const RegisterSchema = Yup.object({
    email: Yup.string().email().required(),
    firstName: Yup.string().required('first name is required'),
    lastName: Yup.string().required('last name is required'),
    password: Yup.string().required(),
    username: Yup.string().required(),
})
const RegisterComponent = () => {
    const navigate = useNavigate()

    return (
        <ContainerComponent isFluid={false}>

        <div className="row">
            <Formik
                initialValues={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                    username: ''
                }}
                validationSchema={RegisterSchema}
                onSubmit={values => {
                    console.log(values);
                    registerUser(values)
                    .then(response => {
                        toast.success('Successfully registered. Please check you mail box.')
                        navigate('/login')
                    })
                    .catch(error => {
                        console.log(error);
                        toast.error(error?.response.data)
                    })
                }}
            >

                {
                    ({error, touched}) => {
                        return <Form className="d-flex justify-content-center text-center">

                            <div className="col-4 mb-3 p-4 b-1 border">
                                <Field className="form-control mb-3 mt-3"
                                       name="email"
                                       placeholder="Email"/>
                                <ErrorMessage name="email"/>

                                <Field className="form-control mb-3 mt-3"
                                       name="firstName"
                                       placeholder="First name"/>
                                <ErrorMessage name="firstName"/>

                                <Field className="form-control mb-3 mt-3"
                                       name="lastName"
                                       placeholder="Last name"/>
                                <ErrorMessage name="lastName" />
                                <Field className="form-control mb-3 mt-3"
                                       name="username"
                                       placeholder="Username"/>
                                <ErrorMessage name="username"/>

                                <Field className="form-control mb-3 mt-3"
                                       type="password"
                                       name="password"
                                       placeholder="Password"/>
                                <ErrorMessage name="password" />
                                {/* <button className="m-3" type="submit">Register</button> */}
                                <ButtonComponent btnText='Register' type="submit" className="mb-3"/>
                            </div>
                        </Form>
                    }
                }
            </Formik>
        </div>
    </ContainerComponent>

    )
}


export default RegisterComponent