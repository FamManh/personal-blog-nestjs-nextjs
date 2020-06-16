import React from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Divider,
    Avatar,
    makeStyles,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";


import LoginForm from "./components/LoginForm";
import gradients from "../../utils/gradients";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(6, 2),
    },
    card: {
        width: theme.breakpoints.values.md,
        maxWidth: "100%",
        overflow: "unset",
        display: "flex",
        position: "relative",
        "& > *": {
            flexGrow: 1,
            flexBasis: "50%",
            width: "50%",
        },
    },
    content: {
        padding: theme.spacing(8, 4, 3, 4),
    },
    media: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        padding: theme.spacing(3),
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    icon: {
        backgroundImage: gradients.green,
        color: "#FFFFFF",
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        position: "absolute",
        top: -32,
        left: theme.spacing(3),
        height: 64,
        width: 64,
        fontSize: 32,
    },
    loginForm: {
        marginTop: theme.spacing(3),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    person: {
        marginTop: theme.spacing(2),
        display: "flex",
    },
    avatar: {
        marginRight: theme.spacing(2),
    },
}));

export default function Login() {
    const classes = useStyles();

    return (
        <div className={classes.root} title="Login">
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <LockIcon className={classes.icon} />
                    <Typography gutterBottom variant="h3">
                        Sign in
                    </Typography>
                    <Typography variant="subtitle2">
                        Sign in on the internal platform
                    </Typography>
                    <LoginForm />
                    <Divider className={classes.divider} />
                    <Link href="/admin/register">
                        <a>Don't have an account?</a>
                    </Link>
                </CardContent>
                <CardMedia
                    className={classes.media}
                    image="/images/auth.png"
                    title="Cover"
                >
                    <Typography color="inherit" variant="subtitle1">
                        Hella narvwhal Cosby sweater McSweeney's, salvia kitsch
                        before they sold out High Life.
                    </Typography>
                    <div className={classes.person}>
                        <Avatar
                            alt="Person"
                            className={classes.avatar}
                            src="/images/avatars/avatar_2.png"
                        />
                        <div>
                            <Typography color="inherit" variant="body1">
                                Ekaterina Tankova
                            </Typography>
                            <Typography color="inherit" variant="body2">
                                Manager at inVision
                            </Typography>
                        </div>
                    </div>
                </CardMedia>
            </Card>
        </div>
    );
}
