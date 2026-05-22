import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AsistenciaService } from '../../../services/asistencia.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { CursoService } from '../../../services/curso.service';
import { Estudiante } from '../../../models/estudiante.model';
import { Curso } from '../../../models/curso.model';
import { Asistencia } from '../../../models/asistencia.model';

@Component({
  selector: 'app-asistencia-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './asistencia-form.html',
})
export class AsistenciaFormComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;
  estudiantes: Estudiante[] = [];
  cursos: Curso[] = [];
  constructor(
    private fb: FormBuilder,
    private service: AsistenciaService,
    private estudianteService: EstudianteService,
    private cursoService: CursoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      presente: [true, Validators.required],
      idEstudiante: [null, Validators.required],
      idCurso: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    this.estudianteService.getAll().subscribe(data => this.estudiantes = data);
    this.cursoService.getAll().subscribe(data => this.cursos = data);
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.service.getById(this.id).subscribe((data: Asistencia) => {
        const date = new Date(data.fecha).toISOString().split('T')[0];
        this.form.patchValue({ ...data, fecha: date });
      });
    }
  }
  save(): void {
    if (this.form.invalid) return;
    const data: Asistencia = { ...this.form.value, idAsistencia: this.id ?? undefined };
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
    this.router.navigate(['/asistencias']);
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
