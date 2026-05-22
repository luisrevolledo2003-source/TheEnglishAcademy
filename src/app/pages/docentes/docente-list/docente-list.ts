import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Docente } from '../../../models/docente.model';
import { DocenteService } from '../../../services/docente.service';

@Component({
  selector: 'app-docente-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './docente-list.html',
})
export class DocenteListComponent implements OnInit {
  docentes: Docente[] = [];
  constructor(private service: DocenteService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.service.getAll().subscribe((data: Docente[]) => this.docentes = data); }
  delete(id: number): void {
    if (confirm('¿Eliminar?')) this.service.delete(id).subscribe(() => this.load());
  }
}
