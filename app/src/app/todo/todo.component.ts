import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

interface Task {
  newTask: string;
  description: string;
  dueDate: string;
  piority: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  form!: FormGroup;
  editForm!: FormGroup;
  listTask!: Task[];
  animal!: string;
  name!: string;
  currentItemEditing!: number;
  editMode = false;
  listTaskLocal!: Task[];
  newTaskUpdate!: Task[];
  @Input() headerContent!: string;

  constructor(
    private fb: FormBuilder,
  ) {
  }


  selects = [
    {label: 'Low', value: 'low'},
    {label: 'Normal', value: 'normal'},
    {label: 'High', value: 'high'},
  ]

  ngOnInit(): void {
    this.form = this.fb.group({
      newTask: ['', Validators.required],
      description: [''],
      dueDate: [''],
      piority: ['']
    })
    this.fetchData();
  }

  fetchData(): void {
    const getTaskFromLocal = localStorage.getItem('task');
    if (getTaskFromLocal) {
      this.listTaskLocal = JSON.parse(getTaskFromLocal);
    } else {
      this.listTaskLocal = [];
    }
  }

  add() {
    console.log(this.form.value);
    this.listTaskLocal.push(this.form.value);
    this.form.reset();
    console.log(this.listTask)
    localStorage.setItem('task', JSON.stringify(this.listTaskLocal));
  }

  onEdit(item: Task, index: number): void {
    this.editMode = true;
    console.log(item)
    this.currentItemEditing = index;
    this.editForm = this.fb.group({
      newTask: [item.newTask, Validators.required],
      description: [item.description],
      dueDate: [item.dueDate],
      piority: [item.piority]
    })
  }

  onEditSave(): void {
    this.listTaskLocal[this.currentItemEditing].newTask = this.editForm.get('newTask')?.value;
    this.listTaskLocal[this.currentItemEditing].description = this.editForm.get('description')?.value;
    this.listTaskLocal[this.currentItemEditing].dueDate = this.editForm.get('dueDate')?.value;
    this.listTaskLocal[this.currentItemEditing].piority = this.editForm.get('piority')?.value;
    this.newTaskUpdate = this.listTaskLocal;
    localStorage.setItem('task', JSON.stringify(this.listTaskLocal));
    this.fetchData();
    this.editMode = false;
  }

  deteleItem(index: number): void {
    alert("Delete Task?");
    this.listTaskLocal.splice(index, 1);
    console.log(this.listTaskLocal)
    localStorage.setItem('task', JSON.stringify(this.listTaskLocal));
    this.fetchData();
  }
}

