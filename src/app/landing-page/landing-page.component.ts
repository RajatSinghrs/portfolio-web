import { AfterViewInit, Component } from '@angular/core';
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
  isDarkMode = false;

  projects = [
    { title: 'Project 1', link: 'https://example.com/project1' },
    { title: 'Project 2', link: 'https://example.com/project2' },
    { title: 'Project 3', link: 'https://example.com/project3' },
    { title: 'Project 4', link: 'https://example.com/project4' },
    { title: 'Project 5', link: 'https://example.com/project5' },
  ];

  ngAfterViewInit(): void {
    // About section animation
    gsap.from('#about h2, #about h1, #about p', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3
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

  onThemeToggle(mode: boolean) {
    this.isDarkMode = mode;
  }
  
  openProject(link: string) {
    window.open(link, '_blank');
  }
}
