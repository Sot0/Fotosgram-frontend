import { Component } from '@angular/core';
import { IPost } from '../../interfaces/post.interface';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-post',
  templateUrl: 'post.page.html',
  styleUrls: ['post.page.scss']
})
export class PostPage {

  cargandoGeo: boolean = false;
  tempImages: string[] = [];

  post: IPost = {
    mensaje: '',
    coords: null,
    posicion: false
  };


  constructor(
    private postService: PostsService,
    private route: Router,
    private geolocation: Geolocation,
    private camera: Camera
  ) {}

  async crearPost() {
    const creado = await this.postService.crearPost(this.post);

    if(creado) {
      this.post = {
        mensaje: '',
        coords: ''
      };

      this.tempImages = [];

      this.route.navigateByUrl('main/tabs/home');
    }
  }

  getGeolocation() {
    if(!this.post.posicion) {
      this.post.coords = null;
      return;
    }
    this.cargandoGeo = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coords = coords;
      this.cargandoGeo = false;
    }).catch((error) => {
       console.log('Error getting location', error);
       this.cargandoGeo = false;
     });
  }

  camara() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.procesarImagen(options);
  }

  libreria() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarImagen(options);
  }

  procesarImagen( extraOptions: CameraOptions) {
    const options = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      ...extraOptions
    };
    this.camera.getPicture(options).then( imageData => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
      const img = window.Ionic.WebView.convertFileSrc( imageData );
      this.postService.subirImagen( imageData );
      this.tempImages.push( img );
    }, (err) => {
     // Handle error
    });
  }

}
