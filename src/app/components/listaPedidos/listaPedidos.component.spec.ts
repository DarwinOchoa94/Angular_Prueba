import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPedidosComponent } from './listaPedidos.component';

describe('PedidosComponent', () => {
  let component: ListaPedidosComponent;
  let fixture: ComponentFixture<ListaPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
