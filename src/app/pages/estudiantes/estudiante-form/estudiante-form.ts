import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EstudianteService } from '../../../services/estudiante.service';
import { NivelService } from '../../../services/nivel.service';
import { Nivel } from '../../../models/nivel.model';
import { Estudiante } from '../../../models/estudiante.model';

@Component({
  selector: 'app-estudiante-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './estudiante-form.html',
  styleUrl: './estudiante-form.css'
})
export class EstudianteFormComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;
  niveles: Nivel[] = [];

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private nivelService: NivelService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      idNivel: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadNiveles();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.loadEstudiante(this.id);
    }
  }

  loadNiveles(): void {
    this.nivelService.getAll().subscribe((data: Nivel[]) => this.niveles = data);
  }

  loadEstudiante(id: number): void {
    this.estudianteService.getById(id).subscribe({
      next: (data: Estudiante) => {
        // Format date to YYYY-MM-DD for input type="date"
        const date = new Date(data.fechaNacimiento);
        const formattedDate = date.toISOString().split('T')[0];
        
        this.form.patchValue({
          ...data,
          fechaNacimiento: formattedDate
        });
      },
      error: (err: any) => console.error(err)
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    const data: Estudiante = {
      ...this.form.value,
      idEstudiante: this.id ?? undefined
    };

    if (this.id) {
      this.estudianteService.update(this.id, data).subscribe({
        next: () => this.onSaved(),
        error: (err: any) => this.onSaveError(err)
      });
    } else {
      this.estudianteService.create(data).subscribe({
        next: () => this.onSaved(),
        error: (err: any) => this.onSaveError(err)
      });
    }
  }

  cerrar(): void {
    this.router.navigate(['/estudiantes']);
  }

  private onSaved(): void {
    alert(this.id ? 'Registro actualizado correctamente.' : 'Registro guardado correctamente.');
    this.cerrar();
  }

  private onSaveError(err: any): void {
    console.error(err);
    alert('No se pudo guardar el registro. Revise los datos e intente nuevamente.');
  }
}
