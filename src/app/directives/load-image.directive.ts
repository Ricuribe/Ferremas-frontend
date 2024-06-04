import { Directive, Input, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLoadImage]'
})
export class LoadImageDirective implements OnInit{
  // @ts-ignore
  @Input() appLoadImage: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const imgElement = this.el.nativeElement;
    imgElement.src = this.appLoadImage;

    imgElement.onload = () => {
      imgElement.classList.add('loaded');
    };

    imgElement.onerror = () => {
      imgElement.src =
        'https://github.com/Ricuribe/Ferremas-frontend/blob/master/sonichu.png?raw=true'; // Ruta a una imagen de marcador de posición
    };
  }
}


