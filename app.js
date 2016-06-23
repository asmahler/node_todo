var methodOverride = require('method-override'), 
    bodyParser     = require('body-parser'), 
    express        = require('express'), 
    app            = express();

var PORT = process.env.PORT || 5000;
//view engine setup 
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));


//fake db of takes 
function Task() {

}

Task.registry = [];

Task.prototype.add = function (config) {
	config.id = Task.registry.length;
	Task.registry.push(config);
}






var tasks = [
	{
		"title":"make bed",
		"description": "make your bed",
		"author": "alex",
		"completed": false 
	},
	{
		"title": "brush teeth",
		"description": "brushing your teeth",
		"author": "alex",
		"completed": false
	},
	{
		"title": "Go to work",
		"description": "Heading to Work ",
		"author": "alex",
		"completed": true
	}];

tasks.forEach(function (task) {
	var instance = new Task();
	instance.add(task);
});


//routes


//index route
app.get('/', function(req,res){
	res.render('index');
});

//new route
app.get('/todos/new', function(req,res){
	res.render('new')
});

app.get('/todos', function(req,res){
	res.render("todos",{tasks:Task.registry})
});


app.post('/todos', function(req,res){
	var author = req.body.author;
	var title = req.body.title;
	var description = req.body.description;
	var newTodo = new Task();
	newTodo.add({
		"author": author, 
		"title": title,
		"description": description,
		"completed": false,
		var id = function(){
			console.log(this.registry)
		}
	});
	res.redirect("/todos")
});

//edit route 







app.listen(PORT, function(){
	console.log('server started on port 5000');
})	