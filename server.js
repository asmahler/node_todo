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


//MIDDLEWARE 
//==========
// ALLOW  Access-Control-Allow-Origin 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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
	res.json(tasksService.get(req.params.taskid));
});

//EDITING A TODO 
//==============

app.put('/todos/:taskid',function(req,res){
	// var taskid = req.params.taskid; 
	// var task = findTodo(taskid);
	tasksService.update(req.params.taskid,req.params.body)
	
	// task.author = req.body.author;
	// task.title = req.body.title; 
	// task.description = req.body.description;
	res.json(task);
});

//DELETING A TODO 
//===============

app.delete('/todos/:taskid',function(req,res){
	tasksService.delete(req.params.taskid);
	res.status(204).end();
});

app.get('*',function(req,res){
	res.redirect('/todos');
})




app.listen(PORT, function(){
	console.log('server started on port 5000');
})	