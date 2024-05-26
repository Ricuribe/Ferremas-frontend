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
      imgElement.src = 'http://127.0.0.1:8000/media/img_productos/82de4f83-1091-4d9d-96ca-7e0f447bee5c.jpg'; // Ruta a una imagen de marcador de posición
    };
  }
}


