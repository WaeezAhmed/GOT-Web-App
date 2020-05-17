import React, { useContext } from 'react';
import ResultCard from './ResultCard';
import { Grid } from '@material-ui/core';
import { ItemContext } from '../App';
import Typography from '@material-ui/core/Typography';


const Content = () => {

    const items = useContext(ItemContext);
    const getItemCard = itemListObj => {

        return (
            <Grid item xs={12} sm={4}>
                <ResultCard {...itemListObj} />
            </Grid>
        );
    };



    return (
        <Grid container spacing={2}>
            <Typography align="center">{items.length === 0 ? "No results found": ""}</Typography>
            
            {items.map(itemListObj => getItemCard(itemListObj))}
        </Grid>
    );
};

export default Content;