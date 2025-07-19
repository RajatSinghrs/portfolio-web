import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  isDarkMode = false;
  leftBoxes = new Array(3);
  rightBoxes = new Array(3);

  projects = [
    { title: 'Project 1', link: 'https://example.com/project1' },
    { title: 'Project 2', link: 'https://example.com/project2' },
    { title: 'Project 3', link: 'https://example.com/project3' },
    { title: 'Project 4', link: 'https://example.com/project4' },
    { title: 'Project 5', link: 'https://example.com/project5' },
  ];

  ngAfterViewInit(): void {
    // Animate intro text
    if (isPlatformBrowser(this.platformId)) {

      gsap.from('.center-content h2, .center-content h1, .center-content p', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3
      });

      // Left boxes slide out
      gsap.utils.toArray<HTMLElement>('.out-left').forEach((el) => {
        gsap.to(el, {
          x: -300,
          opacity: 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true
          }
        });
      });

      // Right boxes slide out
      gsap.utils.toArray<HTMLElement>('.out-right').forEach((el) => {
        gsap.to(el, {
          x: 300,
          opacity: 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true
          }
        });
      });


      // Work section horizontal scroll
      gsap.to('.projects', {
        xPercent: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: '#work',
          start: 'top top',
          end: '+=1500',
          scrub: true,
          pin: true,
          anticipatePin: 1
        }
      });

    }
  }

  onThemeToggle(mode: boolean) {
    this.isDarkMode = mode;
  }

  openProject(link: string) {
    window.open(link, '_blank');
  }
}


