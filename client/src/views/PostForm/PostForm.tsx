import {
    makeStyles,
    Grid,
    Typography,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    Box,
    FormControl,
    TextareaAutosize,
    Button,
} from "@material-ui/core";
import dynamic from "next/dynamic";
import { Page } from "../../components";
import Header from "./components/Header";
import theme from "../../theme";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useState } from "react";
import toSlug from "../../utils/toSlug";
import { PostModel } from "../../model/Post";

const CKEditorComp = dynamic(() => import("./components/ckeditor"), {
    ssr: false,
});

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    content: {
        marginTop: theme.spacing(3),
    },
    ckeditor: {
        marginTop: theme.spacing(3),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    mtop3: {
        marginTop: theme.spacing(3),
    },
}));

const ValidationSchema = yup.object().shape({
    title: yup.string().required("Requied").max(200, "To long"),
    summary: yup.string().required("Requied").max(500, "To long"),
    status: yup.boolean().required("Required"),
    category: yup.string().required("Required"),
});

export default function Post() {
    const classes = useStyles();
    const [postContent, setPostContent] = useState("<p>Viết blog vui vẻ nhé bạn ^^</p>")
    const initialValues = {
        title: "",
        summary: "",
        slug: "",
        published: 0,
        status: 0,
        category: "",
    };

    const handleSubmit = (values: PostModel)=>{
        let postData = {...values};
        postData.content = postContent;
        postData.slug = toSlug(values.title)
        console.log(postData);
    }

    return (
        <Page className={classes.root} title="New post">
            <Header />

            <Formik
                initialValues={initialValues}
                validationSchema={ValidationSchema}
                onSubmit={values=>handleSubmit(values)}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <Grid className={classes.content} container spacing={2}>
                            <Grid item xs={12} sm={7} md={8} lg={9}>
                                <div>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Title"
                                        variant="outlined"
                                        name="title"
                                        error={errors.title && touched.title}
                                        helperText={errors.title}
                                    />
                                    <Typography color="textSecondary">{values.title && `http://localhost:3000/${toSlug(values.title)}`}</Typography>
                                </div>
                                <div className={classes.mtop3}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Summary"
                                        variant="outlined"
                                        rowsMax={10}
                                        multiline
                                        name="summary"
                                        error={
                                            errors.summary && touched.summary
                                        }
                                        helperText={errors.summary}
                                    />
                                </div>
                                <div className={classes.mtop3}>
                                    <CKEditorComp onChange={value => setPostContent(value)} value={postContent}/>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={5} md={4} lg={3} spacing={5}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="label-select-status">
                                        Status
                                    </InputLabel>
                                    <Field
                                        as={Select}
                                        id="label-select-status"
                                        fullWidth
                                        label="Status"
                                        defaultValue={0}
                                        name="status"
                                        error={errors.status && touched.status}
                                        helperText={errors.status}
                                    >
                                        <MenuItem value={1}>Public</MenuItem>
                                        <MenuItem value={0}>Draft</MenuItem>
                                    </Field>
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    className={classes.mtop3}
                                    
                                >
                                    <InputLabel id="label-select-category">
                                        Category
                                    </InputLabel>
                                    <Field
                                        as={Select}
                                        id="label-select-category"
                                        fullWidth
                                        label="Category"
                                        defaultValue={0}
                                        name="category"
                                        error={
                                            errors.category && touched.category
                                        }
                                        helpertext={errors.category}
                                    >
                                        <MenuItem value={1}>Public</MenuItem>
                                        <MenuItem value={0}>Draft</MenuItem>
                                    </Field>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                fullWidth
                                className={classes.mtop3}
                                color="primary"
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Page>
    );
}
