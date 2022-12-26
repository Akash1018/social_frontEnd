import React, { useState,useEffect } from 'react';
import { Container, Grow, Grid, Paper} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Pagination from '../Pagination';

import { getPosts } from '../../actions/posts'
import useStyles from '../../styles';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch])

  return (
    <Grow in>
        <Container>
        <Grid className={classes.mainContainer} container justify='space-between' alignItems='stretch' spacing={3}>
                <Grid item xs={12} sm={12} m={6} lg={6} xl={6}>
                 <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={12} m={6} lg={4} xl={6}>
                 <Form currentId={currentId} setCurrentId={setCurrentId}/>
                 <Paper elevation={6}>
                 </Paper>
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home;