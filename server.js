var express = require('express');
var app = express();
var formidable = require('express-formidable');
var fs = require('fs');
var musctacheExpress = require('mustache-express');

// app.get('/?', function (req, res) {
//     res.send('Yay Node Girls!');
// });
    
// app.get('/iceCream', (req, res ) => {
//     res.send('Mm nothing is better than ice cream in the summer!!!')
// })
    
// app.get('/node', (req, res) => {
//     res.send('Olá mundo, Hello world!')
// })
    
// app.get('/girls', (req, res) => {
//     res.send('Get Up,  dress Up, show Up and never give Up!!!')
// })

app.use(formidable());
app.use(express.static('public'));
app.engine('mustache', musctacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

let post = []

app.get('/my-lovely-endpoint', (req, res) => {
    res.send('Hello there');
});

app.use(formidable());

app.post('/create-post', (req, res) => {
    let createPost = req.fields;
    post.push(createPost);
        fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(post), function (error) {
        });
    res.send(JSON.stringify(req.fields));
    console.log(req.body);
    console.log(req.fields);
})


fs.readFile(__dirname + '/data/posts.json', function (error, file) {
    console.log(file);
});

app.get('/posts/:postID', function(req, res){
    var postID = req.params.postId;
    fs.readFile(__dirname + '/data/posts.json',  JSON.stringify(post), (error, file) => {
        var parsedFile = JSON.parse(file);
        var postContent = parsedFile[postID];
        res.render('post', { post: postContent});
    });
});

app.listen(3000, function () {
    console.log('Server is listening on port 3000. Ready to accept requests!');
  });

