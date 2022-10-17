import { Status } from "./status.enum";

export class Todo {
    id: string = '';
    title: string = '';
    status: Status = Status.TODO;
}