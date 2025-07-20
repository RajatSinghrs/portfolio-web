import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-starlight',
  templateUrl: './starlight.component.html',
  styleUrl: './starlight.component.scss'
})
export class StarlightComponent  implements OnInit {
  @Input() isDarkMode = false;

  constructor(private el: ElementRef, private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {}
ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.createStars();
    this.createShootingStars();
  }
}

  createStars() {
    const container = this.el.nativeElement.querySelector('.starfield');
    if (!container) return;

    for (let i = 0; i < 150; i++) {
      const star = this.renderer.createElement('div');
      this.renderer.addClass(star, 'star');

      if (Math.random() < 0.25) {
        this.renderer.addClass(star, 'twinkle-star');
      }

      this.renderer.setStyle(star, 'top', `${Math.random() * 100}%`);
      this.renderer.setStyle(star, 'left', `${Math.random() * 100}%`);
      this.renderer.setStyle(star, 'animationDelay', `${Math.random() * 3}s`);
      this.renderer.setStyle(star, 'animationDuration', `${Math.random() * 3 + 2}s`);

      this.renderer.appendChild(container, star);
    }
  }

  createShootingStars() {
    const container = this.el.nativeElement.querySelector('.starfield');
    if (!container) return;

    setInterval(() => {
      const shootingStar = this.renderer.createElement('div');
      this.renderer.addClass(shootingStar, 'shooting-star');

      const top = Math.random() * 60 + 10; // 10% to 70%
      const left = Math.random() * 80 + 10; // 10% to 90%
      this.renderer.setStyle(shootingStar, 'top', `${top}%`);
      this.renderer.setStyle(shootingStar, 'left', `${left}%`);

      this.renderer.appendChild(container, shootingStar);

      setTimeout(() => {
        this.renderer.removeChild(container, shootingStar);
      }, 2000);
    }, 4000); // Every 8 seconds
  }
}