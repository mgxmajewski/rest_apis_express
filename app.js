const express = require('express');
const app = express();

const records = require('./records');

app.use(express.json());

// Send a GET request to /quotes READ a list of quotes
app.get('/quotes', async (req, res)=>{
    try{
        const quotes = await records.getQuotes();
        res.json(quotes);
    }catch (err) {
        res.json({message: err.message});
    }
});

// Send a GET request to /quotes/:id to READ(view) a quote
app.get('/quotes/:id', async (req, res)=>{
    try{
        const quote = await records.getQuote(req.params.id);
        res.json(quote);
    }catch (err) {
        res.json({message: err.message});
    }
});

app.post('/quotes', async(req, res) =>{
    try{
        throw new Error("pofspofp[ofa[sdfoa");
        const quote = await records.createQuote({
            quote: req.body.quote,
            author: req.body.author
        });
        res.json(quote);
    }catch (err){
        res.status(500).json({message: err.message});
    }
});

//TODO:
//    - Send a POST request to /quotes to CREATE a new quote
//    - Send a PUT request to /quotes/:id to UPDATE (edit) a quote
//    - Send a DELETE request to /quotes/:id to DELETE a quote
//    - Send a GET request to /quotes/quote/random to READ (view) a random quote


app.listen(3000, () => console.log('Quote API listening on port 3000!'));