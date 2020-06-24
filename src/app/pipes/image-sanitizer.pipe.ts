import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imageSanitizer'
})
export class ImageSanitizerPipe implements PipeTransform {

  constructor(
    private domSatinitizer: DomSanitizer
  ) {}

  transform(imagen: string) {
    return  this.domSatinitizer.bypassSecurityTrustUrl( imagen ) ;
  }

}
