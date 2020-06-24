import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const urlApi = environment.urlApiRest;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, userId: string): string {
    return `${urlApi}/post/imagen/${userId}/${imagen}`;
  }

}
