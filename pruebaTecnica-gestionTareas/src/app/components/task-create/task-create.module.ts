import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskCreateRoutingModule } from './task-create-routing.module';
import { TaskCreateComponent } from './task-create.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TaskCreateRoutingModule,
    FormsModule
  ]
})
export class TaskCreateModule { }
