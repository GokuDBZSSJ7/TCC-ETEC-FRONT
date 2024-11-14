import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartiesComponent } from './parties.component';
import { AuthService } from '../../../services/auth.service';
import { StateService } from '../../../services/state.service';
import { CityService } from '../../../services/city.service';
import { PartyService } from '../../../services/party.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PartiesComponent', () => {
  let component: PartiesComponent;
  let fixture: ComponentFixture<PartiesComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let stateService: jasmine.SpyObj<StateService>;
  let cityService: jasmine.SpyObj<CityService>;
  let partyService: jasmine.SpyObj<PartyService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    const stateServiceSpy = jasmine.createSpyObj('StateService', ['all']);
    const cityServiceSpy = jasmine.createSpyObj('CityService', ['all']);
    const partyServiceSpy = jasmine.createSpyObj('PartyService', ['all']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        NgSelectModule,
        CommonModule,
        FormsModule,
        RouterModule,
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        PartiesComponent // Importando o componente standalone
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: StateService, useValue: stateServiceSpy },
        { provide: CityService, useValue: cityServiceSpy },
        { provide: PartyService, useValue: partyServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PartiesComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    stateService = TestBed.inject(StateService) as jasmine.SpyObj<StateService>;
    cityService = TestBed.inject(CityService) as jasmine.SpyObj<CityService>;
    partyService = TestBed.inject(PartyService) as jasmine.SpyObj<PartyService>;

    authService.getUser.and.returnValue({ name: 'Test User' });
    stateService.all.and.returnValue(of([]));
    cityService.all.and.returnValue(of([]));
    partyService.all.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with states and parties', () => {
    expect(stateService.all).toHaveBeenCalled();
    expect(partyService.all).toHaveBeenCalled();
    expect(component.states).toEqual([]);
    expect(component.dataSource.data).toEqual([]);
  });

  it('should update cities when state is changed', () => {
    const citiesMock = [{ id: 1, name: 'City1' }];
    cityService.all.and.returnValue(of(citiesMock));

    // Ajustando para usar o tipo correto
    component.selectedStateId = { id: 1 } as any;
    component.onStateChange();

    expect(cityService.all).toHaveBeenCalledWith({ id: 1 } as any);
    expect(component.cities).toEqual(citiesMock);
  });

  it('should clear cities if no state is selected', () => {
    component.selectedStateId = null;
    component.onStateChange();
    expect(component.cities).toEqual([]);
  });

  it('should get the user from AuthService', () => {
    expect(authService.getUser).toHaveBeenCalled();
    expect(component.user).toEqual({ name: 'Test User' });
  });

  it('should create form on init', () => {
    expect(component.form).toBeDefined();
  });
});