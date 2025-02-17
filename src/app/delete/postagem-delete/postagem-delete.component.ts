import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css'],
})
export class PostagemDeleteComponent implements OnInit {
  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];
  idPostagem: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      // this.alertas.showAlertInfo('Seu token expirou, faça o login novamente.')
      this.router.navigate(['/login']);
    }
    this.postagemService.refreshToken()
    this.idPostagem = this.route.snapshot.params['id'];
    this.findByIdPostagem(this.idPostagem);
  }

  findByIdPostagem(id: number) {
    this.postagemService.getPostagemById(id).subscribe((resp: Postagem) => {
      this.postagem = resp;
    });
  }

  apagar() {
    this.postagemService.deletePostagem(this.idPostagem).subscribe(() => {
      alert('Postagem apagada.');
      this.router.navigate(['/inicio']);
    });
  }
}
