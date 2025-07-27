// header.component.ts
import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @Input() isDarkMode = false;
  @Output() themeToggled = new EventEmitter<boolean>();
  @Input() isCodedPortfolio: boolean = false;
  @ViewChild('themeToggle', { static: true }) themeToggle!: ElementRef;
  @ViewChild('toggleSlider', { static: true }) toggleSlider!: ElementRef;
  @ViewChild('sunIcon', { static: true }) sunIcon!: ElementRef;
  @ViewChild('moonIcon', { static: true }) moonIcon!: ElementRef;
  @ViewChild('particleContainer', { static: true }) particleContainer!: ElementRef;

  isScrolled = false;
  isAnimating = false;

  constructor(private router: Router) { }

  ngAfterViewInit() {
    // Initialize the toggle position
    this.updateTogglePosition(false);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollTop > 20 && !this.isDarkMode;
  }

  toggleTheme() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    const wasLight = !this.isDarkMode;
    const newTheme = !this.isDarkMode; // Store the new theme state

    // Create particle explosion based on the new theme
    this.createParticleExplosion(newTheme);

    // Main toggle animation sequence
    const timeline = anime.timeline({
      complete: () => {
        // Only update the theme state and emit after animation completes
        this.isDarkMode = newTheme;
        this.isAnimating = false;
        document.body.className = this.isDarkMode ? 'dark-theme' : 'light-theme';
        this.themeToggled.emit(this.isDarkMode);
      }
    });

    // Pulse effect on button
    timeline.add({
      targets: this.themeToggle.nativeElement,
      scale: [1, 1.1, 1],
      duration: 200,
      easing: 'easeOutQuad'
    });

    // Rotate entire button
    timeline.add({
      targets: this.themeToggle.nativeElement,
      rotate: '+=180deg',
      duration: 600,
      easing: 'easeInOutBack',
      offset: '-=100'
    });

    // Slider movement with elastic easing
    timeline.add({
      targets: this.toggleSlider.nativeElement,
      translateX: newTheme ? '24px' : '0px',
      duration: 800,
      easing: 'easeOutElastic(1, .8)',
      offset: '-=500'
    });

    // Icon transitions - fade out current, fade in new
    if (wasLight) {
      // Switching to dark mode - sun out, moon in
      timeline.add({
        targets: this.sunIcon.nativeElement,
        scale: [1, 0],
        rotate: '+=360deg',
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInBack',
        offset: '-=600'
      });

      timeline.add({
        targets: this.moonIcon.nativeElement,
        scale: [0, 1],
        rotate: '-=390deg',
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutBack',
        offset: '-=200'
      });
    } else {
      // Switching to light mode - moon out, sun in
      timeline.add({
        targets: this.moonIcon.nativeElement,
        scale: [1, 0],
        rotate: '+=360deg',
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInBack',
        offset: '-=600'
      });

      timeline.add({
        targets: this.sunIcon.nativeElement,
        scale: [0, 1],
        rotate: '-=360deg',
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutBack',
        offset: '-=200'
      });
    }
  }

  private updateTogglePosition(animate: boolean = true) {
    if (animate) {
      anime({
        targets: this.toggleSlider.nativeElement,
        translateX: this.isDarkMode ? '24px' : '0px',
        duration: 300,
        easing: 'easeOutQuad'
      });
    } else {
      this.toggleSlider.nativeElement.style.transform = `translateX(${this.isDarkMode ? '24px' : '0px'})`;
    }
  }

  private createParticleExplosion(newTheme: boolean) {
    const container = this.particleContainer.nativeElement;
    const button = this.themeToggle.nativeElement;
    const buttonRect = button.getBoundingClientRect();

    // Clear previous particles
    container.innerHTML = '';

    // Create particles
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: ${newTheme ? '#ffd700' : '#4169e1'};
        border-radius: 50%;
        left: ${buttonRect.left + buttonRect.width / 2}px;
        top: ${buttonRect.top + buttonRect.height / 2}px;
        pointer-events: none;
        z-index: 1000;
      `;
      container.appendChild(particle);

      // Animate particles
      const angle = (360 / 12) * i;
      const distance = 60 + Math.random() * 40;

      anime({
        targets: particle,
        translateX: Math.cos(angle * Math.PI / 180) * distance,
        translateY: Math.sin(angle * Math.PI / 180) * distance,
        scale: [1, 0],
        opacity: [1, 0],
        duration: 800 + Math.random() * 400,
        easing: 'easeOutQuad',
        delay: Math.random() * 100,
        complete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }
      });
    }
  }

  scrollTo(sectionId: string) {
    // Keep your existing GSAP scroll function or replace with anime.js if preferred
    anime({
      targets: document.scrollingElement || document.documentElement,
      scrollTop: document.getElementById(sectionId)?.offsetTop! - 80,
      duration: 1000,
      easing: 'easeOutQuad'
    });
  }

  scrollToTop() {
    anime({
      targets: document.scrollingElement || document.documentElement,
      scrollTop: 0,
      duration: 1000,
      easing: 'easeOutQuad'
    });
  }

  openCodePortfolio() {
    this.router.navigate(['/coded-portfolio']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}