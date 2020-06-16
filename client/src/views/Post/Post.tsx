import { makeStyles, Grid, Typography} from '@material-ui/core';

import { Page } from "../../components";
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import Header from './components/Header';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    results: {
        marginTop: theme.spacing(3)
    }
}));

const handleFilter = () => { };
const handleSearch = () => { };

export default function Post(){
    const classes = useStyles();
    return(
        <Page className={classes.root} title="Post">
            <Header />
            <SearchBar
                onFilter={handleFilter}
                onSearch={handleSearch}
            />

            <Results
                className={classes.results}
                customers={[]}
            />
            
        </Page>
    )
}
