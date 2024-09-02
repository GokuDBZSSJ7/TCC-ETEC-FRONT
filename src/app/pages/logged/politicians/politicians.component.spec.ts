import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoliticiansComponent } from './politicians.component';
import { UserService } from '../../../services/user.service';
import { StateService } from '../../../services/state.service';
import { CityService } from '../../../services/city.service';
import { PartyService } from '../../../services/party.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('PoliticiansComponent', () => {
  let component: PoliticiansComponent;
  let fixture: ComponentFixture<PoliticiansComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let stateService: jasmine.SpyObj<StateService>;
  let cityService: jasmine.SpyObj<CityService>;
  let partyService: jasmine.SpyObj<PartyService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getPoliticians', 'filterUser']);
    const stateServiceSpy = jasmine.createSpyObj('StateService', ['all']);
    const cityServiceSpy = jasmine.createSpyObj('CityService', ['all']);
    const partyServiceSpy = jasmine.createSpyObj('PartyService', ['all']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        PoliticiansComponent // Importando o componente standalone
      ],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceSpy },
        { provide: StateService, useValue: stateServiceSpy },
        { provide: CityService, useValue: cityServiceSpy },
        { provide: PartyService, useValue: partyServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PoliticiansComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    stateService = TestBed.inject(StateService) as jasmine.SpyObj<StateService>;
    cityService = TestBed.inject(CityService) as jasmine.SpyObj<CityService>;
    partyService = TestBed.inject(PartyService) as jasmine.SpyObj<PartyService>;

    userService.getPoliticians.and.returnValue(of([]));
    stateService.all.and.returnValue(of([]));
    cityService.all.and.returnValue(of([]));
    partyService.all.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with users, states, and parties', () => {
    expect(userService.getPoliticians).toHaveBeenCalled();
    expect(stateService.all).toHaveBeenCalled();
    expect(partyService.all).toHaveBeenCalled();
    expect(component.users).toEqual([]);
    expect(component.states).toEqual([]);
    expect(component.parties).toEqual([]);
  });

  it('should create a form with default values', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.value).toEqual({
      name: null,
      city_id: null,
      state_id: null,
      party_id: null,
    });
  });

  it('should update cities when state is changed', () => {
    const citiesMock = [{ id: 1, name: 'City1' }];
    cityService.all.and.returnValue(of(citiesMock));

    component.selectedStateId = 1;
    component.onStateChange();

    expect(cityService.all).toHaveBeenCalledWith(1);
    expect(component.cities).toEqual(citiesMock);
  });

  // it('should apply filter and update users', () => {
  //   const usersMock = [{ id: 1, name: 'User1' }];
  //   userService.filterUser.and.returnValue(of(usersMock));

  //   component.applyFilter();

  //   expect(userService.filterUser).toHaveBeenCalledWith(component.form.value);
  //   expect(component.users).toEqual(usersMock);
  // });
});