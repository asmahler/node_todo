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
var tasks= [];
var count =0; 
function NewTodo(author,title,description){
		this.author = author,
		this.title = title, 
		this.description = description,
		this.completed = "false"
		this.id =(++count).toString();
		}

function findTodo(taskId){
	var task;
	for(var i =0;i<tasks.length;i++){
		if(taskId === tasks[i].id){
			task = tasks[i];
		}
	}
	return task;
}
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
	res.render("todos",{tasks:tasks})
});

app.post('/todos', function(req,res){
	var author = req.body.author;
	var title = req.body.title;
	var description = req.body.description;

	var Task = new NewTodo(author,title,description)
	tasks.push(Task); 	

	res.redirect("/todos")
});

//edit route 
app.get('/todos/:taskid',function(req,res){
	var taskid = req.params.taskid;
	var task = findTodo(taskid);
	console.log(task,taskid,tasks);

	if(task){
		res.render('edit',{task:task});
	}else{
		res.redirect('/todos');
	}

	
});

app.post('/todos/:taskid',function(req,res){
 	//i need to update the task with information 
 	var taskid = req.params.taskid;
 	//i need to set the object props with this new information; 
 	var author = req.body.author;
	var title = req.body.title;
	var description = req.body.description;
	var task = findTodo(taskid);
		if(task){
			task.author = author; 
			task.title = title; 
			task.description = description; 
			console.log(task,tasks);
			res.redirect("/todos");
		}else{
			res.redirect("/todos");
		}
	




})






app.listen(PORT, function(){
	console.log('server started on port 5000');
})	