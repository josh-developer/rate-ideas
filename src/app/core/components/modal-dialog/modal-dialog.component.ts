import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AccountModalComponent } from './account/account.component';
import { MyIdeasModalComponent } from './my-ideas/my-ideas.component';

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, AccountModalComponent, MyIdeasModalComponent],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.scss',
})
export class ModalDialogComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    console.log(this.data);
  }
}
