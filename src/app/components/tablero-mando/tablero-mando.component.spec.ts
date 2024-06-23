import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroMandoComponent } from './tablero-mando.component';

describe('TableroMandoComponent', () => {
  let component: TableroMandoComponent;
  let fixture: ComponentFixture<TableroMandoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableroMandoComponent]
    });
    fixture = TestBed.createComponent(TableroMandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
