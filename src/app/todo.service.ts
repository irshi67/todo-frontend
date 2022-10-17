import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Todo } from './todo/todo';
import { catchError, Observable, throwError } from 'rxjs';
import { Status } from './todo/status.enum';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080';

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl + '/todo')
      .pipe(
        catchError(this.handleError)
      );
  }

  createTodo(todoData: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl + '/todo/save', todoData)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateTodo(todoData: Todo): Observable<Todo> {
    if (todoData.status === Status.TODO){
      todoData.status = Status.DOING
    } else {
      todoData.status = Status.DONE
    }
    return this.http.put<Todo>(this.apiUrl + '/todo/update/' + todoData.id, todoData)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/todo/delete/' + id)
      .pipe(
        catchError(this.handleError)
      )

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


}
