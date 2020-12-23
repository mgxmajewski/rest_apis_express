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
        res.status(500).json({message: err.message});
    }
});

// Send a GET request to /quotes/:id to READ(view) a quote
app.get('/quotes/:id', async (req, res)=>{
    try{
        const quote = await records.getQuote(req.params.id);
        if(quote){
            res.json(quote);
        } else {
            res.status(404).json({message: "Not found dude"});
        }

    }catch (err) {
        res.status(500).json({message: err.message});
    }
});

//    - Send a POST request to /quotes to CREATE a new quote
app.post('/quotes', async(req, res) =>{
    try{
        if(req.body.author && req.body.quote){
            const quote = await records.createQuote({
                quote: req.body.quote,
                author: req.body.author
            });
            res.status(201).json(quote);
        } else{
            res.status(400).json({message: "Author and quote required."});
        }

    }catch (err){
        res.status(500).json({message: err.message});
    }
});

//    - Send a PUT request to /quotes/:id to UPDATE (edit) a quote
app.put('/quotes/:id', async (req, res)=>{
    try{
        const quote = await records.getQuote(req.params.id);
        if(quote){
            quote.quote = req.body.quote;
            quote.author = req.body.author;

            await records.updateQuote(quote);
            res.status(204).end();
        } else {
            res.status(404).json({message: "Wasn't foud"});
        }
    }catch (e) {
        res.status(500).json({message: err.message});
    }
});

//    - Send a DELETE request to /quotes/:id to DELETE a quote
app.delete("/quotes/:id", async(req, res) =>{
    try{
        const quote = await records.getQuote(req.params.id);
        await records.deleteQuote(quote);
        res.status(204).end();
    }catch (err) {
        res.status(500).json({message: err.message});
    }
});
//TODO:
//    - Send a GET request to /quotes/quote/random to READ (view) a random quote


app.listen(3000, () => console.log('Quote API listening on port 3000!'));