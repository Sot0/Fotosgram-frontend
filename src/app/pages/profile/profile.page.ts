import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../../interfaces/user.interface';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiService } from '../../services/ui-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  usuario: IUsuario = {};

  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
  }

  async actualizar( formActualizar: NgForm) {
    if(formActualizar.invalid) return;

    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);

    if(actualizado) {
      this.uiService.toastInformativo('Datos actualizados');
    } else {
      this.uiService.toastInformativo('No se han podido actualizar los datos, intenta más tarde');
    }
  }

  logout() {

  }
}
