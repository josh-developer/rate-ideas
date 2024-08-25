import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '@core/services/users.service';
import { IUser } from '@core/models/IUser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'account-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: 'account.component.html',
})
export class AccountModalComponent implements OnInit {
  usersService = inject(UsersService);
  data = inject(MAT_DIALOG_DATA);
  dialog = inject(MatDialog);
  isUserDataLoading = true;

  formAddIdeas = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    this.usersService.getUser().subscribe((res) => {
      this.isUserDataLoading = false;
      this.isUserDataLoading;
      this.formAddIdeas.setValue({
        name: res.data.firstName,
        surname: res.data.lastName,
        username: res.data.userName,
        email: res.data.email,
      });
    });
  }

  submit(): void {
    this.dialog.closeAll();
  }
}
