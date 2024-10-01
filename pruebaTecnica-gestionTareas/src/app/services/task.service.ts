import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  addTask(name: string): void {
    const currentTasks = this.tasksSubject.value;
    const newTask: Task = { id: Date.now(), nombre: name, completado: false };
    this.tasksSubject.next([...currentTasks, newTask]);
  }

  toggleTaskCompletion(taskId: number): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map(task =>
      task.id === taskId ? { ...task, completado: !task.completado } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  deleteTask(taskId: number): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.filter(task => task.id !== taskId);
    this.tasksSubject.next(updatedTasks);
  }

  filterTasks(completed: boolean): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.completado === completed))
    );
  }
}