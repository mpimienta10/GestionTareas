import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]> | undefined; // Observable para mostrar las tareas filtradas
  filter: 'all' | 'completed' | 'pending' = 'all';

  constructor(private taskService: TaskService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Obtenemos las tareas desde el servicio y aplicamos el filtro
    this.tasks$ = this.taskService.tasks$.pipe(
      map(tasks => this.filterTasks(tasks))
    );
  }

  // Método para cambiar el filtro y actualizar la vista
  setFilter(filter: 'all' | 'completed' | 'pending'): void {
    this.filter = filter;
    this.tasks$ = this.taskService.tasks$.pipe(
      map(tasks => this.filterTasks(tasks))
    );
    this.cd.markForCheck(); // Forzar la detección de cambios
  }

  // Método para filtrar las tareas según el filtro actual
  private filterTasks(tasks: Task[]): Task[] {
    if (this.filter === 'completed') {
      return tasks.filter(task => task.completado);
    } else if (this.filter === 'pending') {
      return tasks.filter(task => !task.completado);
    } else {
      return tasks; // Mostrar todas las tareas
    }
  }

  toggleTaskCompletion(taskId: number): void {
    this.taskService.toggleTaskCompletion(taskId);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }
}