import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Aula } from '../../../models/aula.model';
import { AulaService } from '../../../services/aula.service';

@Component({
  selector: 'app-aula-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aula-list.html',
})
export class AulaListComponent implements OnInit {
  aulas: Aula[] = [];
  constructor(private service: AulaService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.service.getAll().subscribe((data: Aula[]) => this.aulas = data); }
  delete(id: number): void {
    if (confirm('¿Eliminar?')) this.service.delete(id).subscribe(() => this.load());
  }
}
