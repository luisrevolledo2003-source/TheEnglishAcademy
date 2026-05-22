import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatriculaService } from '../../../services/matricula.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { CursoService } from '../../../services/curso.service';
import { Estudiante } from '../../../models/estudiante.model';
import { Curso } from '../../../models/curso.model';
import { Matricula } from '../../../models/matricula.model';

@Component({
  selector: 'app-matricula-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './matricula-form.html',
})
export class MatriculaFormComponent implements OnInit {
  form: FormGroup;
  id: number | null = null;
  estudiantes: Estudiante[] = [];
  cursos: Curso[] = [];
  constructor(
    private fb: FormBuilder,
    private service: MatriculaService,
    private estudianteService: EstudianteService,
    private cursoService: CursoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      fechaInscripcion: ['', Validators.required],
      estado: ['', Validators.required],
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
      this.service.getById(this.id).subscribe((data: Matricula) => {
        const date = new Date(data.fechaInscripcion).toISOString().split('T')[0];
        this.form.patchValue({ ...data, fechaInscripcion: date });
      });
    }
  }
  save(): void {
    if (this.form.invalid) return;
    const data: Matricula = { ...this.form.value, idMatricula: this.id ?? undefined };
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
    this.router.navigate(['/matriculas']);
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
