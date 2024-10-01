import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';

const routes: Routes = [
  {
    path: 'tasks', // Ruta para la lista de tareas
    component: TaskListComponent
  },
  {
    path: 'create',
    loadChildren: () => import('./components/task-create/task-create.module').then(m => m.TaskCreateModule)
  },
  {
    path: '', // Ruta predeterminada
    redirectTo: '/tasks',
    pathMatch: 'full' // Redirigir exactamente a /tasks
  },
  {
    path: '**', // Ruta de fallback (si se ingresa una ruta inválida)
    redirectTo: '/tasks'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
