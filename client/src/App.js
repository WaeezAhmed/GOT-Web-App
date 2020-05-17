import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, Grid } from "@material-ui/core";
import Header from './components/Header'
import Content from './components/Content';
import './App.css';
import axios from 'axios';

export const ItemContext = React.createContext();
export const NewItemsContext = React.createContext();
const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {

  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get('/api/items')
      .then(res => {
        console.log(res);
        setItems(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);


  function reloadItems(newItems) {
    setItems(newItems)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container direction="column">
        <Grid item>
          <ItemContext.Provider value={items}>
            <NewItemsContext.Provider value={reloadItems}>
              <Header />
            </NewItemsContext.Provider>
          </ItemContext.Provider>
        </Grid>
        <Grid item container style={{ paddingTop: "20px" }}>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <ItemContext.Provider value={items}>
                <Content />
            </ItemContext.Provider>
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </Grid>
    </ThemeProvider >
  );
}

export default App;
