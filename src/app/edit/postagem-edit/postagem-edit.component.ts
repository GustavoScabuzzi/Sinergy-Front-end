
import { TemaService } from './../../service/tema.service';
import { Tema } from './../../model/Tema';

import { PostagemService } from './../../service/postagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from './../../model/Postagem';


import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {


  postagem: Postagem = new Postagem()

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService

  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      // this.alertas.showAlertInfo('Seu token expirou, faça o login novamente.')
      this.router.navigate(['/login'])
    }

    this.postagemService.refreshToken()
    this.temaService.refreshToken()

    let idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(idPost)

    this.findAllTemas()
  }

  findByIdPostagem(id: number) {
    this.postagemService.getPostagemById(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  atualizar() {
    this.tema.idTema = this.idTema
    this.postagem.tema = this.tema
    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem atualizada!')
      this.router.navigate(['/inicio'])
    })

  }

}
