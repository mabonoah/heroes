import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from './material-angular.module';
import { PageNotFoundComponent, SpinnerComponent } from '../components';

const modules: any[] = [CommonModule, FormsModule, ReactiveFormsModule, MaterialAngularModule];

@NgModule({
  declarations: [SpinnerComponent, PageNotFoundComponent],
  imports: [...modules],
  exports: [
    PageNotFoundComponent,
    SpinnerComponent,
    ...modules
  ]
})
export class SharedModule { }
