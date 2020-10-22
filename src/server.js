import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const articlesInfo = {
    'learn-react': {
        upvotes: 1,
        comments: [
            {
                "username":"advay",
                "text":"love it"
            },
            {
                "username":"aadit",
                "text":"love it too"
            }
        ],
    },
    'learn-node': {
        upvotes: 2,
        comments: [],
    },
    'my-thoughts-on-resumes': {
        upvotes: 3,
        comments: [],
    },
}

const app = express();

app.use(express.static(path.join(__dirname, '/build')))

app.use(bodyParser.json());


app.get('/api/articles/:name', async (req, res) => {
    const articleName = req.params.name;
    console.log(articleName);
    //console.log(articlesInfo[articleName].comments[1].text);

    res.status(200).send(articlesInfo[articleName]);
})

app.post('/api/articles/:name/upvote', (req,res) => {
    const articleName = req.params.name;
    console.log("articleName in upvote " + articleName);

    articlesInfo[articleName].upvotes += 1; 
    res.status(200).send(`${articleName} now has ${articlesInfo[articleName].upvotes} upvotes`);
})

app.post('/api/articles/:name/add-comment',(req,res) => {
    const {username,text} = req.body;
    const articleName = req.params.name;
    console.log("articleName in add comment " + articleName);
    console.log("username in add comment " + username);
    console.log("text in add comment " + text);
    articlesInfo[articleName].comments.push({username,text});
    res.status(200).send(articlesInfo[articleName]);
})

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen(8000,() => console.log('Listening on port 8000'));