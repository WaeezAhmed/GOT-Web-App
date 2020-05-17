import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        height: "100%"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});



const ResultCard = (props) => {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const { name, location, region, attacker_king, defender_king, attacker_outcome, battle_type } = props;
    return(
        <Card className={classes.root} m={10}>
            <CardContent>
                <Typography variant="h6" component="h2" align="center">
                    {name}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                    {location} {bull} {region} {bull} {battle_type}
                </Typography>
                
                <Typography className={classes.pos} color="textPrimary" align="center">
                {attacker_king}
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Attacker King
                </Typography>
                {bull}<br/>
                {defender_king}
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Defender King
                </Typography>
                </Typography>
                <Typography className={classes.pos} style={{color: attacker_outcome == 'win' ? "green" : "red"}} align="center">
                    {attacker_outcome == 'win' ? "Attacker Wins" : "Attacker Loses"}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ResultCard;

