import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { List } from './list/list.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    List
  ],
  exports: [
    List
  ],
  providers: []
})
export class SharedModule { }
