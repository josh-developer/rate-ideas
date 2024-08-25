import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ModalDialogComponent } from '@core/components/modal-dialog/modal-dialog.component';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { IdeaComponent } from '@shared/components/idea/idea.component';
// import { Component, inject, OnInit } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@core/auth/services/auth.service';
// import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { IIdea } from '@core/models/IIdea';
import { IdeasService } from '@core/services/ideas.service';
// import { IdeaComponent } from '@shared/components/idea/idea.component';

@Component({
  standalone: true,
  selector: 'app-my-ideas',
  imports: [NavbarComponent, MatTabGroup, MatTab, MatButtonModule, IdeaComponent, MatToolbarModule, MatIconModule],
  templateUrl: './my-ideas.component.html',
  styles: ``,
})
export default class MyIdeasComponent implements OnInit {
  ideasService = inject(IdeasService);
  authService = inject(AuthService);
  ideasState = [true, false];

  userId: number | undefined;
  ideas?: IIdea[] = [];

  dialog = inject(MatDialog);
  openModal() {
    this.dialog.open(ModalDialogComponent, {
      data: {
        clickedPlace: 'myideas',
      },
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUser()?.id;

    this.ideasService.getIdeas(this.userId!).subscribe((data) => {
      console.log(data);
    });
  }
}
