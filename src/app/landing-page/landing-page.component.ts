import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('closed', style({
        height: '0',
        opacity: 0,
        padding: '0 1rem',
        overflow: 'hidden'
      })),
      state('open', style({
        height: '*',
        opacity: 1,
        padding: '1rem'
      })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class LandingPageComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  @ViewChildren('resumePanel') resumePanels!: QueryList<ElementRef>;

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
      this.resumePanels.forEach((panel, index) => {
        gsap.from(panel.nativeElement, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel.nativeElement,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.1
        });
      });
    }
  }

  resumeSections = [
    {
      title: 'Experience',
      open: false,
      items: [
        'Frontend Developer at ABC Corp (2022-2024)',
        'Intern at XYZ Solutions (2021-2022)'
      ]
    },
    {
      title: 'Education',
      open: false,
      items: [
        'B.Tech in Information Technology, Abdul Kalam Technical University (2019-2023)'
      ]
    },
    {
      title: 'Skills',
      open: false,
      items: ['Angular', 'GSAP', 'Three.js', 'TypeScript', 'Node.js']
    },
    {
      title: 'Certifications',
      open: false,
      items: ['XYZ Intership', 'Test-II Testing Intern']
    }
  ];


  toggleSection(section: any, el?: HTMLElement) {
    section.open = !section.open;

    if (el) {
      const content = el.querySelector('.resume-content');
      if (content) {
        if (section.open) {
          gsap.fromTo(
            content,
            { height: 0, opacity: 0 },
            {
              height: 'auto',
              opacity: 1,
              duration: 0.4,
              ease: 'back.out(1.7)'
            }
          );
        } else {
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power1.in'
          });
        }
      }
    }
  }

  onThemeToggle(mode: boolean) {
    this.isDarkMode = mode;
  }

  openProject(link: string) {
    window.open(link, '_blank');
  }


}


