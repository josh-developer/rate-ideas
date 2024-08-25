import { Dialog } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { ICategory } from '@core/models/ICategory';
import { CategoriesService } from '@core/services/categories.service';
import { IdeasService } from '@core/services/ideas.service';

@Component({
  selector: 'add-ideas',
  standalone: true,
  templateUrl: 'my-ideas.component.html',
  imports: [MatDialogContent, MatDialogModule, ReactiveFormsModule],
})
export class MyIdeasModalComponent implements OnInit {
  dialog = inject(Dialog);
  CategoriesService = inject(CategoriesService);
  ideasService = inject(IdeasService);
  educations: ICategory[] = [];
  formGroupIdeas = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    categoryId: new FormControl(),
  });

  ngOnInit() {
    this.CategoriesService.getAllCategories().subscribe((res) => {
      // console.log(res, 'Res');
      this.educations = res.data;
    });
  }
  addIdeas() {
    this.ideasService.addIdeas(this.formGroupIdeas.value).subscribe((res) => {
      console.log(res);
    });
    this.dialog.closeAll();
  }
}
