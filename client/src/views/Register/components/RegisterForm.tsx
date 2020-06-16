import clsx from "clsx";
import PropTypes from "prop-types";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import {
    Button,
    Checkbox,
    FormHelperText,
    TextField,
    Typography,
    Link,
    makeStyles,
} from "@material-ui/core";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
    root: {},
    fields: {
        margin: theme.spacing(-1),
        marginTop: theme.spacing(3),
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            flexGrow: 1,
            margin: theme.spacing(1),
        },
    },
    policy: {
        display: "flex",
        alignItems: "center",
    },
    policyCheckbox: {
        marginLeft: "-14px",
    },
    submitButton: {
        marginTop: theme.spacing(2),
        width: "100%",
    },
}));

export default function RegisterForm() {
    const classes = useStyles();

    const RegisterSchema = yup.object().shape({
        firstname: yup.string().min(3).max(20).required("Required"),
        lastname: yup.string().min(3).max(20).required("Required"),
        email: yup.string().email("Invalid email").required("Required"),
        password: yup
            .string()
            .min(6, "To short")
            .max(32, "To long")
            .required("Required"),
    });

    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={(values) => console.log(values)}
        >
            {({ errors, touched }) => (
                <Form className={classes.root}>
                    <div className={classes.fields}>
                        <Field
                            as={TextField}
                            error={errors.firstname && touched.firstname}
                            helperText={
                                errors.firstname ? errors.firstname : null
                            }
                            label="First name"
                            name="firstname"
                            variant="outlined"
                        />
                        <Field
                            as={TextField}
                            error={errors.lastname && touched.lastname}
                            helperText={
                                errors.lastname ? errors.lastname : null
                            }
                            label="Last name"
                            name="lastname"
                            variant="outlined"
                        />
                        <Field
                            as={TextField}
                            error={errors.email && touched.email}
                            fullWidth
                            helperText={errors.email ? errors.email : null}
                            label="Email address"
                            name="email"
                            variant="outlined"
                        />
                        <Field
                            as={TextField}
                            error={errors.password && touched.password}
                            fullWidth
                            helperText={
                                errors.password ? errors.password : null
                            }
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                        />
                    </div>
                    <Button
                        className={classes.submitButton}
                        color="secondary"
                        // disabled={!!errors.email}
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Create account
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
