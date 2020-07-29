import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ScrollService } from 'src/app/shared/servicios/scroll/scroll.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {


  public showMenu: Boolean = true;

  @ViewChild('slider') slider: ElementRef;
  @ViewChild('text') text: ElementRef;
  @ViewChild('players') players: ElementRef;
  @ViewChild('partners') partners: ElementRef;
  @ViewChild('news') news: ElementRef;


  private subScrollTo: Subscription;
  public scrollTo: string = "AAAA";

  constructor(private scrollService: ScrollService) { }

  ngOnInit(): void {
    this.scrollToSection();
  }

  ngOnDestroy(): void {
    if (this.subScrollTo) {
      this.subScrollTo.unsubscribe();
    }
  }

  scrollToSection() {
    this.subScrollTo = this.scrollService.scrollTo$.subscribe((_ruta: string) => {
      if (_ruta !== "") {
        this.scrollToElement(_ruta);
      }
    });
  }

  scrollToElement($element): void {
    switch ($element) {
      case 'slider':
        $element = this.slider.nativeElement;
        break;
      case 'text':
        $element = this.text.nativeElement;
        break;
      case 'players':
        $element = this.players.nativeElement;
        break;
      case 'partners':
        $element = this.partners.nativeElement;
        break;
      case 'news':
        $element = this.news.nativeElement;
        break;
      default:
        break;
    }

    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

}
