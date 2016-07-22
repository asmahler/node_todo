function NewTodo(author,title,description){
		this.author = author || 'default',
		this.title = title || 'default', 
		this.description = description || 'default',
		this.completed = "false"
		this.id =(++count).toString();
		}

var tasks= [];
var count =0; 
var service = {};


service.getTasks = function(){
	return tasks;
};


service.create = function(config){
	var author = config.author;
	var title = config.title;
	var description = config.description;
	var task = new NewTodo(author,title,description)
	tasks.push(task);
	return task;  

}

service.get = function(id){
	var task;
	for(var i =0;i<tasks.length;i++){
		if(id === tasks[i].id){
			task = tasks[i];
		}
	}
	return task;
}

service.update = function(id,params){
	var task = service.get(id);
	task.author = params.author;
	task.title = params.title;
	task.description = params.description;
	return task;
}

service.delete = function(id){
	var task = service.get(id) 
	var index = tasks.indexOf(task);
	tasks.splice(index,1);
}

module.exports = service;


