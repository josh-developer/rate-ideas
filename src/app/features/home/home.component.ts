import { Component, inject, OnInit } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '@core/auth/services/auth.service';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { ICategory } from '@core/models/ICategory';
import { IIdea } from '@core/models/IIdea';
import { CategoriesService } from '@core/services/categories.service';
import { IdeasService } from '@core/services/ideas.service';
import { IdeaComponent } from '@shared/components/idea/idea.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule, IdeaComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styles: ``,
})
export default class HomeComponent implements OnInit {
  ideasService = inject(IdeasService);
  categoriesService = inject(CategoriesService);
  authService = inject(AuthService);

  ideas?: IIdea[] = [];
  categories: ICategory[] = [];

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((categories) => {
      const allIdeas = categories.data.reduce((acc, category) => {
        return [...acc, ...category.ideas];
      }, [] as IIdea[]);

      const categoryAll: any = {
        ideas: allIdeas,
        name: 'All',
        id: 1000000,
      };
      this.categories = [categoryAll, ...categories.data];
      this.ideas = this.categories[0].ideas;
    });
  }

  onTabSwitch(event: MatTabChangeEvent): void {
    this.ideas = this.categories[event.index]?.ideas;
  }
}
