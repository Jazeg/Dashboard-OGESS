import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableroMandoComponent } from './tablero-mando.component';
import { NO_ERRORS_SCHEMA } from '@angular/core'; // Esto evita problemas de otros componentes o directivas no relevantes en la prueba

describe('TableroMandoComponent', () => {
  let component: TableroMandoComponent;
  let fixture: ComponentFixture<TableroMandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableroMandoComponent],
      schemas: [NO_ERRORS_SCHEMA] // Esto excluye validaciones de componentes hijos no relevantes
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroMandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta cambios iniciales
  });

  // Verifica que el componente se ha creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ejemplo: Verifica si un título es el esperado
  it('should have a title `Dashboard`', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h1')?.textContent;
    expect(title).toContain('Dashboard');
  });
})