import {useEffect, useState} from 'react'
import {Tabs, Tab, Grid, Paper, Card, Button, TextField, Table, TableRow, TableCell, TableHead, TableBody} from '@material-ui/core';
import {ThemeProvider, createMuiTheme, makeStyles} from '@material-ui/core/styles';
import LittleDotIcon from '@material-ui/icons/FiberManualRecord';
import {lightBlue} from '@material-ui/core/colors'

function App() {
  const useStyles = makeStyles ({
    tableCell: {
      padding: "4px 4px 4px 4px",
      borderBottom: "none"
    },
    tableHeadCell: {
      padding: 0,
      fontSize: 10,
      color: '#777',
      borderBottom: "none"
    },
    smallIcon: {
      color: "#00FF00",
      fontSize: 6
    }
  });
  const classes = useStyles();

  const [index, setIndex] = useState(0);
  function changeClickedTab() {
    if (index===0) {
      setIndex(1)
    }
    else {
      setIndex(0)
    }
  }

  const tableTheme = createMuiTheme({
    palette: {
      type: 'dark',
      background: {
        paper: "#111", default: "#000"
      }
    },
    typography: {
      fontSize: 8,
    }
  });

  const appTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: lightBlue,
      secondary: {main: "#f00"},
    },
    typography: {
      fontSize: 8,
      button: {
        textTransform: 'none', fontSize: 14
      },
    },
    shape: {
      borderRadius: 0,
    },
    overrides: {
      MuiFilledInput: {
        root: {backgroundColor: "#333"},
      },
      MuiButton: {
        fullWidth: { maxWidth: "70%" }
      },
    },
    props: {
      MuiTextField: {variant: 'filled'}
    }
  });

  
  const [trades, setTrades] = 
  useState([
    {"td":"2021-10-11 01:02:22","side":"Buy","product":"BTC-USD", "quantity":"0.016", "price":"52,921.9914", "cp":"Cumberland", "pp":"0.226", "spl":"0.20482", "type":"hedge", "execution":"Rest API", "status":"On"},
    {"td":"2021-02-15 04:55:12","side":"Sell","product":"BTC-XLM", "quantity":"0.016", "price":"0.4914", "cp":"Coinflip GPA DBA Holdings", "pp":"834.192", "spl":"0.20482", "type":"hedge", "execution":"Rest API", "status":"On"},
    {"td":"2021-01-22 07:25:32","side":"Buy","product":"BTC-XRP", "quantity":"0.016", "price":"0.9914", "cp":"Cumberland", "pp":"34444.226", "spl":"0.20482", "type":"hedge", "execution":"Rest API", "status":"On"},  
    {"td":"2021-01-28 07:25:32","side":"Sell","product":"BTC-ETH", "quantity":"0.016", "price":"0.0814", "cp":"Cumberland", "pp":"3424.226", "spl":"1.20482", "type":"hedge", "execution":"Rest API", "status":"On"}  
  ])

  const tradesURL = "http://localhost:9000/trades";
  useEffect(() => {
    fetch(tradesURL)
    .then(res => res.json())
    .then(jsonData => setTrades(jsonData))
  }, []);
  
  const columns = [
    {title: "Trade Date"}, {title: "Side"}, {title: "Product"}, {title: "Quantity"}, {title: "Price"}, {title: "Counterparty"}, 
    {title: "Provider Price"}, {title: "Sales PL"}, {title: "Type"},  {title: "Execution"}, {title: "Status"}
  ]
 
  return (
    <ThemeProvider theme={appTheme}>
      <Paper>
      <Grid container spacing={0} direction="row" alignItems="center" justify="space-around">
          <Grid item xs={6}>
          
          <ThemeProvider theme={tableTheme}>
            <Card className={classes.tableRoot}>
              <Table>
                <TableHead>
                    <TableRow>
                    {
                    columns.map((column) => 
                      (
                          (column.title==="Product" || column.title==="Price" || column.title==="Provider Price")
                          ?<TableCell className={classes.tableHeadCell} style={{textAlign: 'center'}}>{column.title}</TableCell> 
                          :<TableCell className={classes.tableHeadCell}>{column.title}</TableCell> 
                      ))
                    }
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                  trades.map((trade) =>
                  (
                    <TableRow key = {trade.product}>
                      <TableCell className={classes.tableCell} style={{color: "#777"}}>{trade.td}</TableCell>
                      {
                        (trade.side==="Buy")
                        ?<TableCell className={classes.tableCell} style={{color: "green"}}>{trade.side}</TableCell>
                        :<TableCell className={classes.tableCell} style={{color: "red"}}>{trade.side}</TableCell>
                      } 
                      <TableCell className={classes.tableCell}>{trade.product}</TableCell>
                      <TableCell className={classes.tableCell}>{trade.quantity}</TableCell>
                      <TableCell className={classes.tableCell}>{trade.price}</TableCell>
                      <TableCell className={classes.tableCell} style={{color: "#f59042"}}>{trade.cp}</TableCell>
                      <TableCell className={classes.tableCell} style={{textAlign: 'right'}}>{trade.pp}</TableCell>
                      <TableCell className={classes.tableCell}>{trade.spl}</TableCell>
                      <TableCell className={classes.tableCell} style={{color: "#f59042"}}>{trade.type}</TableCell>
                      <TableCell className={classes.tableCell} style={{color: "#f59042"}}>{trade.execution}</TableCell>
                      {
                        (trade.status==="ON" || trade.status==="On" || trade.status==="on")
                        ?<TableCell className={classes.tableCell}> {<LittleDotIcon className={classes.smallIcon}/>}</TableCell>
                        :<TableCell className={classes.tableCell}>{<LittleDotIcon className={classes.smallIcon} style={{color: "red"}}/>}</TableCell>
                      } 
                    </TableRow>
                  ))
                }
                </TableBody>
              </Table>
            </Card>
          </ThemeProvider>
          </Grid>
          <Grid item xs = {2} container spacing={1}>
            <Grid>
            <Tabs  textColor="secondary"  indicatorColor="secondary" value={index} onChange={changeClickedTab}>
              <Tab style={{ minWidth: 100 }}  label="Sell"></Tab>
              <Tab style={{ minWidth: 100 }}  label="Buy"></Tab>
            </Tabs>
            </Grid>
            <Grid item xs={12}><TextField select style={{ fontSize: 5 }}  color="secondary" fullWidth label="Product" size="small"/></Grid>
            <Grid item xs={12}><TextField color="secondary" fullWidth label="Quantity" size="small"/></Grid>       
            <Grid item xs = {12} container direction="column" alignItems="center">
              <Button fullWidth variant="contained" color="primary" fon style={{padding:0, color:"white"}}>Add</Button>
            </Grid>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}
export default App;