import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NewItemsContext } from '../App';
import axios from 'axios';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal() {

    const [result, setResult] = React.useState();
    const [kingValue, setKing] = React.useState();
    const [locationValue, setLocation] = React.useState();
    const [regionValue, setRegion] = React.useState();
    const [typeValue, setType] = React.useState();

    function handleSumbit(event) {
        event.preventDefault();
        console.log({ kingValue, locationValue, regionValue, typeValue });

        const params = {
            king: kingValue,
            location: locationValue,
            region: regionValue,
            battle_type: typeValue
        };
        axios
            .get('/api/items/search', { params })
            .then(res => {
                console.log(res);
                setResult(res.data);
                newItems(res.data);
                handleClose();
            })
            .catch(err => {
                console.log(err);
            })
    }

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [items, setAllItems] = useState([]);
    useEffect(() => {
        axios
            .get('/api/items')
            .then(res => {
                console.log(res);
                setAllItems(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    var newItems = useContext(NewItemsContext);

    const unique_king_1 = [...new Set(items.map(item => item.attacker_king))];
    const unique_king_2 = [...new Set(items.map(item => item.defender_king))];
    const unique_king_un = [...new Set(unique_king_1.concat(unique_king_2))];
    const unique_king = unique_king_un.filter(Boolean);

    const unique_loc_1 = [...new Set(items.map(item => item.location))];
    const unique_loc = unique_loc_1.filter(Boolean);

    const unique_region_1 = [...new Set(items.map(item => item.region))];
    const unique_region = unique_region_1.filter(Boolean);

    const unique_type_1 = [...new Set(items.map(item => item.battle_type))];
    const unique_type = unique_type_1.filter(Boolean);

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Search by King, Location, Region or Type </h3>
            <div>
                <form onSubmit={handleSumbit}>
                    <Autocomplete
                        id="king"
                        onChange={(event, value) => setKing(value)}
                        name="kingValue"
                        value={kingValue}
                        options={unique_king}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Select King" variant="outlined" />}
                    /><br />
                    <Autocomplete
                        id="location"
                        onChange={(event, value) => setLocation(value)}
                        name="locationValue"
                        value={locationValue}
                        options={unique_loc}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Select Location" variant="outlined" />}
                    /><br />
                    <Autocomplete
                        id="Region"
                        onChange={(event, value) => setRegion(value)}
                        name="regionValue"
                        value={regionValue}
                        options={unique_region}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Select Region" variant="outlined" />}
                    /><br />
                    <Autocomplete
                        id="Type"
                        onChange={(event, value) => setType(value)}
                        name="typeValue"
                        value={typeValue}
                        options={unique_type}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Select Battle Type" variant="outlined" />}
                    /><br />
                    <Button
                        type="submit"
                        startIcon={<SearchIcon />}
                        variant="contained"
                        onClick={handleOpen}>
                        SEARCH
                    </Button>
                </form>
            </div>
        </div>
    );

    return (
        <div>
            <Button
                startIcon={<SearchIcon />}
                onClick={handleOpen}>
                SEARCH
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}