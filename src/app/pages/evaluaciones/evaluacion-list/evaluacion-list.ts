import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Evaluacion } from '../../../models/evaluacion.model';
import { EvaluacionService } from '../../../services/evaluacion.service';

@Component({
  selector: 'app-evaluacion-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './evaluacion-list.html',
})
export class EvaluacionListComponent implements OnInit {
  evaluaciones: Evaluacion[] = [];
  constructor(private service: EvaluacionService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.service.getAll().subscribe((data: Evaluacion[]) => this.evaluaciones = data); }
  delete(id: number): void {
    if (confirm('¿Eliminar?')) this.service.delete(id).subscribe(() => this.load());
  }
}
