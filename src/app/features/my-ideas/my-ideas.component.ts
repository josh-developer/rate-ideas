import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ModalDialogComponent } from '@core/components/modal-dialog/modal-dialog.component';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { IdeaComponent } from '@shared/components/idea/idea.component';

@Component({
  standalone: true,
  selector: 'app-my-ideas',
  imports: [NavbarComponent, MatTabGroup, MatTab, MatButtonModule, IdeaComponent, MatToolbarModule, MatIconModule],
  templateUrl: './my-ideas.component.html',
  styles: ``,
})
export default class MyIdeasComponent {
  ideas = [true, false];
  dialog = inject(MatDialog);
  openModal() {
    this.dialog.open(ModalDialogComponent, {
      data: {
        clickedPlace: 'myideas',
      },
    });
  }
}
