import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAdminTableComponent } from './users-admin-table.component';

describe('UsersAdminTableComponent', () => {
  let component: UsersAdminTableComponent;
  let fixture: ComponentFixture<UsersAdminTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAdminTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAdminTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
