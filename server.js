var methodOverride = require('method-override'), 
    bodyParser     = require('body-parser'), 
    express        = require('express'), 
    app            = express(),
    tasksService   = require('./services/tasks');

var PORT = process.env.PORT || 5000;
//view engine setup 
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));


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
	res.json(tasksService.getTasks());
});

//CREATING A NEW TODO TASK 
//========================

app.post('/todos', function(req,res){		
	res.json(tasksService.create(req.body));
});


//THIS WILL GET AN INDIVIDUAL TASK 
//================================

app.get('/todos/:taskid',function(req,res){
	res.json(tasksService.get(req.body.taskid);
});

//EDITING A TODO 
//==============

app.put('/todos/:taskid',function(req,res){
	// var taskid = req.params.taskid; 
	// var task = findTodo(taskid);
	updateTask2(req.params.taskid,req.params.body)
	// task.author = req.body.author;
	// task.title = req.body.title; 
	// task.description = req.body.description;
	res.json(task);
});

//DELETING A TODO 
//===============

app.delete('/todos/:taskid',function(req,res){
	
	res.status(204).end();
});

app.get('*',function(req,res){
	res.redirect('/todos');
})




app.listen(PORT, function(){
	console.log('server started on port 5000');
})	