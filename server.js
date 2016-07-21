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
		this.author = author || 'default',
		this.title = title || 'default', 
		this.description = description || 'default',
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
//ROUTES 
//======

//PAGE ROUTES 
//===========

//index route, shows homepage 
app.get('/', function(req,res){
	res.render('index');
});

//createing a new todo route 

app.get('/todos/new', function(req,res){
	res.render('new');
});

//EDIT THE PAGE ROUTE

app.get('/todos/:taskid/edit',function(req,res){
	var taskid = req.params.taskid;
	var task = findTodo(taskid);
	

	if(task){
		res.render('edit',{task:task});
	}else{
		res.redirect('/todos');
	}
});




//API ROUTE 
//=========

//GET TO TODOS 
//============

app.get('/todos', function(req,res){
	res.json(tasks);
});

//CREATING A NEW TODO TASK 
//========================

app.post('/todos', function(req,res){
	var author = req.body.author;
	var title = req.body.title;
	var description = req.body.description;
	var task = new NewTodo(author,title,description)
	tasks.push(task); 	

	res.json(task)
});

app.post('/todos1',function(req,res){

 	var taskid = req.params.taskid;

 	var author = req.body.author;
	var title = req.body.title;
	var description = req.body.description; 

	console.log(req.body);
	


 // 	var task = findTodo(taskid);
	// 	task.author = author;
	// 	task.title = title; 
	// 	task.description = description;

	// 	console.log(taskid,author,title,description); 
	// res.json(task);
})

app.get('/todos/status/:taskid',function(req,res){
	var taskid = req.params.taskid; 
	var task = findTodo(taskid);
	task.completed = "true";
	res.redirect('/todos');
})


app.get('/todos/delete/:taskid',function(req,res){
	var taskid = req.params.taskid; 
	var task = findTodo(taskid);
	var index = tasks.indexOf(task);
	tasks.splice(index,1);
	res.redirect('/todos');
});

app.get('*',function(req,res){
	res.redirect('/todos');
})




app.listen(PORT, function(){
	console.log('server started on port 5000');
})	