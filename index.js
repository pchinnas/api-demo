var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Lang = [{id: 1, name: 'Java'}];
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

// get all languages
app.get("/language", (req, res, next) => {
    res.json(Lang);
   });

// get language by id
app.get('/language/:id', (req, res) => {
    const language = Lang.find(g => g.id === parseInt(req.params.id));
    if (!language) return res.status(404).send('The language with the given ID was not found.');
    res.send(language);
});

app.post('/updateLanguage/:id', (req, res) => {
    console.log(req);
    const language = Lang.find(g => g.id === parseInt(req.params.id));
    if (!language) return res.status(404).send('The language with the given ID was not found.');

    language.name = req.body.lang;
    res.send(language);
});

app.post("/addLanguage", function(req, res) {
    const languagae = {
        id: Lang.length + 1,
        name: req.body.lang
    }
    Lang.push(languagae);
    res.send(languagae); 
  });

  app.delete('/deleteLanguage/:id', (req, res) => {
    const language = Lang.find(g => g.id === parseInt(req.params.id));
    if (!language) return res.status(404).send('The language with the given ID was not found.');

    const index = Lang.indexOf(language);
    Lang.splice(index, 1);

    res.send(language);
});