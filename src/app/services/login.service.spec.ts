import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store authToken and user in localStorage on login', () => {
    const mockResponse = {
      access_token: 'mock-token',
      user: { id: 1, name: 'Lucas' }
    };

    service.login({ email: 'lucas@gmail.com', password: '12345678' }).subscribe(() => {
      expect(localStorage.getItem('authToken')).toBe(mockResponse.access_token);
      expect(localStorage.getItem('user')).toBe(JSON.stringify(mockResponse.user));
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call the correct API endpoint', () => {
    const loginData = { email: 'lucas@gmail.com', password: '12345678' };

    service.login(loginData).subscribe();

    const req = httpMock.expectOne('http://127.0.0.1:8000/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginData);
  })
});
