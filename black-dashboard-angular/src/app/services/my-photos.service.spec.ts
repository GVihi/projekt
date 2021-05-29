import { TestBed } from '@angular/core/testing';

import { MyPhotosService } from './my-photos.service';

describe('MyPhotosService', () => {
  let service: MyPhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
