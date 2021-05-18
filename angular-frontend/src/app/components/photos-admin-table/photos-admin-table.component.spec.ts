import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosAdminTableComponent } from './photos-admin-table.component';

describe('PhotosAdminTableComponent', () => {
  let component: PhotosAdminTableComponent;
  let fixture: ComponentFixture<PhotosAdminTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosAdminTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosAdminTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
