import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent  implements AfterViewInit{

    ngAfterViewInit(): void {
    // Additional entrance animations can go here
  }

   scrollTo(sectionId: string) {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: `#${sectionId}`,
        offsetY: 80 // to account for fixed header
      },
      ease: 'power2.out'
    });
  }

}
