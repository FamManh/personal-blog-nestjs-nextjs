import React, { Fragment, useEffect } from "react";
import {
    Drawer,
    Divider,
    Paper,
    Avatar,
    Typography,
    makeStyles,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import {
    Inbox as InboxIcon,
    Category as CategoryIcon,
    Assignment as AssignmentIcon,
    Person as PersonIcon,
    Comment as CommentIcon
} from "@material-ui/icons";
import { ListItemProps } from "@material-ui/core/ListItem";
import clsx from "clsx";
import Link from "next/link";
// import navigationConfig from './navigationConfig';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        overflowY: "auto",
    },
    content: {
        padding: theme.spacing(2),
    },
    profile: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "fit-content",
    },
    avatar: {
        width: 60,
        height: 60,
    },
    name: {
        marginTop: theme.spacing(1),
    },
    divider: {
        marginTop: theme.spacing(2),
    },
    navigation: {
        marginTop: theme.spacing(2),
    },
}));

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
    return (
        <Link href={props.href}>
            <ListItem button component="a" {...props} />
        </Link>
    );
}

export default function NavBar(props) {
    const { openMobile, onMobileClose, className, ...rest } = props;

    const classes = useStyles();

    const navbarContent = (
        <div className={classes.content}>
            <div className={classes.profile}>
                <Avatar
                    alt="Person"
                    className={classes.avatar}
                    // component={RouterLink}
                    src="images/avatars/avatar_1.png"
                />
                <Typography className={classes.name} variant="h4">
                    {" "}
                    Manh Pham
                    {/* {session.user.first_name} {session.user.last_name} */}
                </Typography>
                {/* <Typography variant="body2">{session.user.bio}</Typography> */}
            </div>
            <Divider className={classes.divider} />
            <nav className={classes.navigation}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemLink href="/dashboard/posts">
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Posts" />
                    </ListItemLink>
                    <ListItemLink href="/dashboard/categories">
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Categories" />
                    </ListItemLink>
                    <ListItemLink href="/dashboard/users">
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItemLink>
                    <ListItemLink href="/dashboard/comments">
                        <ListItemIcon>
                            <CommentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Comments" />
                    </ListItemLink>
                </List>
            </nav>
        </div>
    );

    return (
        <Fragment>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                >
                    <div {...rest} className={clsx(classes.root, className)}>
                        {navbarContent}
                    </div>
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Paper
                    {...rest}
                    className={clsx(classes.root, className)}
                    elevation={1}
                    square
                >
                    {navbarContent}
                </Paper>
            </Hidden>
        </Fragment>
    );
}
