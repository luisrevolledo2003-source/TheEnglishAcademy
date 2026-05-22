import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Estudiante } from '../../../models/estudiante.model';
import { EstudianteService } from '../../../services/estudiante.service';

@Component({
  selector: 'app-estudiante-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './estudiante-list.html',
  styleUrl: './estudiante-list.css'
})
export class EstudianteListComponent implements OnInit {
  estudiantes: Estudiante[] = [];

  constructor(private estudianteService: EstudianteService) {}

  ngOnInit(): void {
    this.loadEstudiantes();
  }

  loadEstudiantes(): void {
    this.estudianteService.getAll().subscribe({
      next: (data: Estudiante[]) => {
        this.estudiantes = data;
      },
      error: (err: any) => {
        console.error('Error loading estudiantes', err);
      }
    });
  }

  deleteEstudiante(id: number): void {
    if (confirm('¿Está seguro de eliminar este estudiante?')) {
      this.estudianteService.delete(id).subscribe({
        next: () => {
          this.loadEstudiantes();
        },
        error: (err: any) => {
          console.error('Error deleting estudiante', err);
        }
      });
    }
  }
}
