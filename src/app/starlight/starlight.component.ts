import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-starlight',
  templateUrl: './starlight.component.html',
  styleUrl: './starlight.component.scss'
})
export class StarlightComponent  implements OnInit {
 @Input() isDarkMode = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.createStars();
  }

  createStars() {
    const container = this.el.nativeElement.querySelector('.starfield');
    if (!container) return;

    for (let i = 0; i < 150; i++) {
      const star = this.renderer.createElement('div');
      this.renderer.addClass(star, 'star');

      this.renderer.setStyle(star, 'top', `${Math.random() * 100}%`);
      this.renderer.setStyle(star, 'left', `${Math.random() * 100}%`);
      this.renderer.setStyle(star, 'animationDelay', `${Math.random() * 3}s`);
      this.renderer.setStyle(star, 'animationDuration', `${Math.random() * 3 + 2}s`);

      this.renderer.appendChild(container, star);
    }
  }
}