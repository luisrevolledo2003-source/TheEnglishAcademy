import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Nivel } from '../../../models/nivel.model';
import { NivelService } from '../../../services/nivel.service';

@Component({
  selector: 'app-nivel-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nivel-list.html',
  styleUrl: './nivel-list.css'
})
export class NivelListComponent implements OnInit {
  niveles: Nivel[] = [];

  constructor(private nivelService: NivelService) {}

  ngOnInit(): void {
    this.loadNiveles();
  }

  loadNiveles(): void {
    this.nivelService.getAll().subscribe((data: Nivel[]) => this.niveles = data);
  }

  deleteNivel(id: number): void {
    if (confirm('¿Está seguro de eliminar este nivel?')) {
      this.nivelService.delete(id).subscribe(() => this.loadNiveles());
    }
  }
}
