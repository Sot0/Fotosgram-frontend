import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  constructor(
    private domSanitizer: DomSanitizer
  ) {}

  transform( imagen: string): any {
    const domImg = `background-image: url('${imagen}')`;
    return this.domSanitizer.bypassSecurityTrustStyle(domImg);
  };

}
