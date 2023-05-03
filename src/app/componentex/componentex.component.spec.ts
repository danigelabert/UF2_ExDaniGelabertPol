import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentexComponent } from './componentex.component';

describe('ComponentexComponent', () => {
  let component: ComponentexComponent;
  let fixture: ComponentFixture<ComponentexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
