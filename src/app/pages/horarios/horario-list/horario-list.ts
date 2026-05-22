import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Horario } from '../../../models/horario.model';
import { HorarioService } from '../../../services/horario.service';

@Component({
  selector: 'app-horario-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './horario-list.html',
})
export class HorarioListComponent implements OnInit {
  horarios: Horario[] = [];
  constructor(private service: HorarioService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.service.getAll().subscribe((data: Horario[]) => this.horarios = data); }
  delete(id: number): void {
    if (confirm('¿Eliminar?')) this.service.delete(id).subscribe(() => this.load());
  }
}
