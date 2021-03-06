import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { TodoItem } from '../TodoItem';
import { TodoList } from '../TodoList';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-todolist-item-detail',
  templateUrl: './todolist-item-detail.component.html',
  styleUrls: ['./todolist-item-detail.component.css']
})
export class TodolistItemDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TodolistItemDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      list: TodoList,
      item: TodoItem,
      flag: string,
      id: number
    }, private apiService: ApiService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(item: TodoItem, flag: string, id: number): void{
    if(flag === 'create'){
      this.apiService.addItemToList(id, item).subscribe( todoItem => {
        this.dialogRef.close(todoItem);
      });
    } else {
      this.apiService.updateItem(item.todolistId, item).subscribe( result => {
        this.dialogRef.close();
      });
    }


  } 
  ngOnInit(): void {
  }

}
