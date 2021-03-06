import { Button, TextField, makeStyles } from "@material-ui/core";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import * as yup from 'yup';


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
    submitButton: {
        marginTop: theme.spacing(2),
        width: "100%",
    },
}));

export default function LoginForm() {

    const classes = useStyles();

    const SigninSchema = yup.object().shape({
        email: yup.string()
        .email('Invalid email')
        .required('Required'),

        password: yup.string()
        .min(6, 'To short')
        .max(32, 'To long')
        .required('Required')
    })

    const initialValues = {
        email: "",
        password: "",
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SigninSchema}
            onSubmit={(values) => console.log(values)}
        >
            {({ errors, touched }) => (
                <Form>
                    <div className={classes.fields}>
                        <Field
                            as={TextField}
                            error={errors.email && touched.email}
                            fullWidth
                            helperText={errors.email ? (errors.email) : null}
                            label="Email"
                            name="email"
                            variant="outlined"
                        />
                        <Field
                            as={TextField}
                            error={errors.password && touched.password}
                            fullWidth
                            helperText={errors.password ? errors.password: null}
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                        />
                    </div>
                    <Button
                        className={classes.submitButton}
                        color="secondary"
                        // disabled={!!errors.email || !!errors.password}
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Sign in
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
