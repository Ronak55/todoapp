import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  taskObj : Task = new Task();
  taskArr : Task[] = [];
  addTaskValue: string = '';
  editTaskValue: string = '';
  


  constructor(private crudService : CrudService){


  }

  ngOnInit():void{

    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();

  }

  getAllTask(){

    this.crudService.getAllTask().subscribe(res=>{

      this.taskArr = res;
       
    }, err=>{
      alert("Unable to get list of tasks!")
    })
  }

  addTask(){

  
    const lastTaskId = this.taskArr.length > 0 ? parseInt(this.taskArr[this.taskArr.length - 1].id, 10) + 1 : 1;

    this.taskObj.id = lastTaskId.toString(); 

    this.taskObj.task_name = this.addTaskValue;

    this.crudService.addTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
      this.addTaskValue = "";
    }, err=>{
      alert(err);
    })
  }

  editTask(){

 
    const lastTaskId = this.taskArr[this.taskArr.length - 1].id;

    this.taskObj.id = lastTaskId.toString(); 
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    }, err=>{
      alert("Failed to update task");
    })
  }

  deleteTask(etask : Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.ngOnInit();
    }, err=>{
      alert("Failed to delete task");
    })
  }

  call(etask : Task){
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
