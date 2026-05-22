import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TipoCurso } from '../../../models/tipo-curso.model';
import { TipoCursoService } from '../../../services/tipo-curso.service';

@Component({
  selector: 'app-tipo-curso-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tipo-curso-list.html',
})
export class TipoCursoListComponent implements OnInit {
  tipos: TipoCurso[] = [];
  constructor(private service: TipoCursoService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.service.getAll().subscribe((data: TipoCurso[]) => this.tipos = data); }
  delete(id: number): void {
    if (confirm('¿Eliminar?')) this.service.delete(id).subscribe(() => this.load());
  }
}
