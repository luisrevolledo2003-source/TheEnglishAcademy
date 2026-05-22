import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { NivelService } from '../../../services/nivel.service';
import { Estudiante } from '../../../models/estudiante.model';
import { Nivel } from '../../../models/nivel.model';
import { Evaluacion } from '../../../models/evaluacion.model';

@Component({
  selector: 'app-evaluacion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './evaluacion-form.html',
})
export class EvaluacionFormComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;
  estudiantes: Estudiante[] = [];
  niveles: Nivel[] = [];
  constructor(
    private fb: FormBuilder,
    private service: EvaluacionService,
    private estudianteService: EstudianteService,
    private nivelService: NivelService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      tipo: ['', Validators.required],
      calificacion: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      fecha: ['', Validators.required],
      idEstudiante: [null, Validators.required],
      idNivel: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    this.estudianteService.getAll().subscribe(data => this.estudiantes = data);
    this.nivelService.getAll().subscribe(data => this.niveles = data);
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.service.getById(this.id).subscribe((data: Evaluacion) => {
        const date = new Date(data.fecha).toISOString().split('T')[0];
        this.form.patchValue({ ...data, fecha: date });
      });
    }
  }
  save(): void {
    if (this.form.invalid) return;
    const data: Evaluacion = { ...this.form.value, idEvaluacion: this.id ?? undefined };
    if (this.id) {
      this.service.update(this.id, data).subscribe({
        next: () => this.onSaved(),
        error: (err: any) => this.onSaveError(err)
      });
    } else {
      this.service.create(data).subscribe({
        next: () => this.onSaved(),
        error: (err: any) => this.onSaveError(err)
      });
    }
  }

  cerrar(): void {
    this.router.navigate(['/evaluaciones']);
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
