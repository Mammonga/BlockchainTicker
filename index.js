import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
const port=3000;
const API_URL="https://api.blockchain.com"
const yourBearerToken="8db7fbae-1020-48a2-ab48-eaf230b1be6d"
const symbol = "BTC-USD";

app.use(express.static(__dirname + '/public'));

const config = {headers: { Authorization: `Bearer ${yourBearerToken}` },};

app.get("/", (req,res)=>{
    res.render("homepage.ejs");
})

app.get("/cryptoList", async(req,res)=>{

    const responseSymbol = await axios.get(API_URL+`/v3/exchange/symbols`,config);
    const responseTicker = await axios.get(API_URL + `/v3/exchange/tickers`, config);
    
    const dataSymbol=Object.values(responseSymbol.data);
    const dataTicker = responseTicker.data;

    // const data = for (var i=0; i<dataTicker.length; i++)
    // const symbol = dataSymbol[i]
    // return {symbol, ticker: dataTicker[i]}
    
    const data = dataTicker.map((ticker, i) => {
        const symbol = dataSymbol.at(i) // dataSymbol[i]
        return {
            symbol,
            ticker
        }
    })
    
    






    
   
    res.render("index.ejs", {data});
});


app.listen(port, ()=>{

    console.log("Listening on Port: "+port);
})

