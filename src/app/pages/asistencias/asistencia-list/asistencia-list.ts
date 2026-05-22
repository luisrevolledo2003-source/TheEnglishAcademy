import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Asistencia } from '../../../models/asistencia.model';
import { AsistenciaService } from '../../../services/asistencia.service';

@Component({
  selector: 'app-asistencia-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './asistencia-list.html',
})
export class AsistenciaListComponent implements OnInit {
  asistencias: Asistencia[] = [];
  constructor(private service: AsistenciaService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.service.getAll().subscribe((data: Asistencia[]) => this.asistencias = data); }
  delete(id: number): void {
    if (confirm('¿Eliminar?')) this.service.delete(id).subscribe(() => this.load());
  }
}
