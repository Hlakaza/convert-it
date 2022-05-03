import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterComponent } from './converter.component';
import { RouterModule, Routes } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: ConverterComponent,
  },
];

@NgModule({
  declarations: [ConverterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatButtonModule
  ],
})
export class ConverterModule {}
