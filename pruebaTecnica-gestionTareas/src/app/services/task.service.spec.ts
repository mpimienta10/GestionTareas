import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a task and list it', () => {
    // Verificamos que inicialmente la lista de tareas esté vacía
    service.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(0);
    });

    // Agregamos una nueva tarea
    service.addTask('New Task');

    // Verificamos que la tarea se haya agregado correctamente
    service.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].nombre).toBe('New Task');
      expect(tasks[0].completado).toBe(false); // Verificamos que la tarea esté marcada como no completada
    });
  });

  it('should list multiple tasks', () => {
    // Agregamos varias tareas
    service.addTask('Task 1');
    service.addTask('Task 2');
    service.addTask('Task 3');

    // Verificamos que todas las tareas se hayan agregado correctamente
    service.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(3); // Debe haber tres tareas
      expect(tasks[0].nombre).toBe('Task 1');
      expect(tasks[1].nombre).toBe('Task 2');
      expect(tasks[2].nombre).toBe('Task 3');
    });
  });
});
