import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '@core/models/ICategory';
import { CategoriesService } from '@core/services/categories.service';
import { IdeasService } from '@core/services/ideas.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IResponse } from '@core/models/IResponse';
import { ModalDialogComponent } from '../modal-dialog.component';

@Component({
  selector: 'add-ideas',
  standalone: true,
  templateUrl: 'my-ideas.component.html',
  imports: [MatDialogContent, MatSelectModule, MatInputModule, MatDialogModule, ReactiveFormsModule],
})
export class MyIdeasModalComponent implements OnInit {
  categoriesService = inject(CategoriesService);
  ideasService = inject(IdeasService);
  destroyRef = inject(DestroyRef);
  dialogRef = inject(MatDialogRef<ModalDialogComponent>);

  educations: ICategory[] = [];
  formGroupIdeas = new FormGroup({
    title: new FormControl('', [Validators.minLength(4), Validators.required]),
    description: new FormControl('', [Validators.minLength(15), Validators.required]),
    categoryId: new FormControl(null, [Validators.required]),
  });

  ngOnInit() {
    const isValue = this.categoriesService.categories$.value.length > 0;
    const categoryObs$: any = isValue ? this.categoriesService.categories$ : this.categoriesService.getAllCategories();

    categoryObs$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data: IResponse<ICategory[]>) => {
      if (isValue) {
        this.educations = data as any as ICategory[];
      } else {
        this.educations = data.data as ICategory[];
      }
    });
  }

  close(): void {
    this.dialogRef.close({ success: false });
  }

  addIdeas() {
    this.ideasService.addIdeas(this.formGroupIdeas.value).subscribe((res) => {
      this.dialogRef.close({ success: true });
    });
  }
}
