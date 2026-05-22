import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Curso } from '../../../models/curso.model';
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './curso-list.html',
  styleUrl: './curso-list.css'
})
export class CursoListComponent implements OnInit {
  cursos: Curso[] = [];

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursoService.getAll().subscribe((data: Curso[]) => this.cursos = data);
  }

  deleteCurso(id: number): void {
    if (confirm('¿Está seguro de eliminar este curso?')) {
      this.cursoService.delete(id).subscribe(() => this.loadCursos());
    }
  }
}
