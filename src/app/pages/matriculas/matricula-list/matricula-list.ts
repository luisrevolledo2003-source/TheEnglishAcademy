import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Matricula } from '../../../models/matricula.model';
import { MatriculaService } from '../../../services/matricula.service';

@Component({
  selector: 'app-matricula-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './matricula-list.html',
})
export class MatriculaListComponent implements OnInit {
  matriculas: Matricula[] = [];
  constructor(private service: MatriculaService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.service.getAll().subscribe((data: Matricula[]) => this.matriculas = data); }
  delete(id: number): void {
    if (confirm('¿Eliminar?')) this.service.delete(id).subscribe(() => this.load());
  }
}
