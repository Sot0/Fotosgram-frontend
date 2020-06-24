import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IRespuestaPosts, IPost } from '../interfaces/post.interface';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
const urlApi = environment.urlApiRest;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  nuevoPost = new EventEmitter<IPost>();

  constructor(
    private http: HttpClient,
    private fileTransfer: FileTransfer,
    private usuarioService: UsuarioService
  ) { }

  getPosts( pull: boolean = false ) {
    if(pull) this.paginaPosts = 0;

    this.paginaPosts ++;
    return this.http.get<IRespuestaPosts>(`${urlApi}/post/?pagina=${this.paginaPosts}`);
  }

  crearPost(post: IPost) {
    return new Promise(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.usuarioService.token
      });
      this.http.post(`${urlApi}/post/`, post, { headers})
        .subscribe(resp => {
          if(resp['ok']) {
            this.nuevoPost.emit( resp['post']);
            resolve(true);
          }
          resolve(false);
        });
    });
  }

  subirImagen(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'imagen',
      headers: {
        'x-token': this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload( img, `${urlApi}/post/upload`, options )
      .then( data => {
        console.log(data);
      })
      .catch( error => console.log('Error al cargar el archivo: ', error));

  }

}
