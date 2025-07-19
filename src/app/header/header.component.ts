import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  @Input() isDarkMode = false;
  @Output() themeToggled = new EventEmitter<boolean>();
  @Input() isCodedPortfolio: boolean = false;

  isScrolled = false;
  constructor(private router: Router) { }

  scrollTo(sectionId: string) {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: `#${sectionId}`,
        offsetY: 80
      },
      ease: 'power2.out'
    });
  }

  scrollToTop() {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: 'power2.out'
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollTop > 20 && !this.isDarkMode;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.className = this.isDarkMode ? 'dark-theme' : 'light-theme';
    this.themeToggled.emit(this.isDarkMode);
  }

   openCodePortfolio() {
    this.router.navigate(['/coded-portfolio']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}