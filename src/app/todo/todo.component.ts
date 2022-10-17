import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Status } from './status.enum';
import { Todo } from './todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = new Todo();
  editing: boolean = false;
  editingTodo: Todo = new Todo();
  readonly Status = Status;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }


  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  createTodo(todoForm: NgForm): void {
    this.todoService.createTodo(this.newTodo)
      .subscribe(createTodo => {
        todoForm.reset();
        this.newTodo = new Todo();
        this.todos.unshift(createTodo)
      });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(todo => todo.id != id);
      });
  }

    updateTodo(todoData: Todo): void {
      console.log(todoData);
      this.todoService.updateTodo(todoData)
        .subscribe(updatedTodo => {
          let existingTodo = this.todos.find(todo => todo.id === updatedTodo.id);
          Object.assign(existingTodo, updatedTodo);

        });
  }















}
