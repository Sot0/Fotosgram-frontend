import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IUsuario } from '../interfaces/user.interface';
import { NavController } from '@ionic/angular';

const urlApi = environment.urlApiRest;
const nombreTokenStorage = 'tokenFotosgram';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: IUsuario = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  login( email: string, password: string ) {
    return new Promise(resolve => {
      const data = {
        email,
        password
      };
      this.http.post(`${urlApi}/user/login`, data)
        .subscribe( resp => {
          if(resp['ok']) {
            this.guardarToken(resp['token']);
            resolve(true);
          } else {
            this.token = null;
            this.storage.remove(nombreTokenStorage);
            resolve(false);
          }
        });
    });
  };

  registro( usuario: IUsuario ) {
    return new Promise( resolve => {
      this.http.post(`${urlApi}/user/create`, usuario)
        .subscribe( resp => {
          if(resp['ok']) {
            this.guardarToken(resp['token']);
            resolve(true);
          } else {
            this.token = null;
            this.storage.remove(nombreTokenStorage);
            resolve(false);
          }
        });
    });
  }

  getUsuario() {
    if(!this.usuario._id) {
      this.validaToken();
    }
    return {
      ...this.usuario
    };
  }

  async guardarToken( token: string ) {
    this.token = token;
    await this.storage.set(nombreTokenStorage, token);
  };

  async cargarToken() {
    this.token = await this.storage.get(nombreTokenStorage) || null;
  }

  async validaToken(): Promise<boolean> {
    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.http.get(`${urlApi}/user/`, {headers})
        .subscribe(resp => {
          if(resp['ok']) {
            this.usuario = resp['usuario'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login')
            resolve(false);
          }
        })
    });
  }

  async actualizarUsuario( usuario: IUsuario) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {
      this.http.patch(`${urlApi}/user/actualizar`, usuario, {headers})
        .subscribe(resp => {
          if(resp['ok']) {
            this.guardarToken( resp['token'] );
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });

  }

};
