import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyImageComponent } from './classify-image.component';

describe('ClassifyImageComponent', () => {
  let component: ClassifyImageComponent;
  let fixture: ComponentFixture<ClassifyImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassifyImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifyImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
