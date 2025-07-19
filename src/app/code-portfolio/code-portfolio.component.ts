import { Component } from '@angular/core';

@Component({
  selector: 'app-code-portfolio',
  templateUrl: './code-portfolio.component.html',
  styleUrl: './code-portfolio.component.scss'
})
export class CodePortfolioComponent {
 isDarkMode = false; // Adjust if you have global dark mode or use a service
 portfolioItems = [
    {
      title: 'Awesome Project',
      description: 'Description of the project goes here.',
      github: 'https://github.com/yourrepo/project'
    },
    {
      title: 'Another Cool App',
      description: 'This is another cool app description.',
      github: 'https://github.com/yourrepo/another'
    }
    // ...add more items
  ];

  onThemeToggle(newMode: boolean) {
    this.isDarkMode = newMode;
  }
}
