import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { MessagesService } from '../messages.service';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);

describe('DashboardComponent', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService: HeroService;
  let httpClientSpy: { get: jasmine.Spy };
  let spy: any;
  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);

  const mockHeroes: Hero[] =  [
    {id: 1, name: 'Batman'},
    {id: 2, name: 'Superman'},
    {id: 3, name: 'Iron Man'},
    {id: 4, name: 'Kick-ass'},
    {id: 5, name: 'Thor'},
    {id: 7, name: 'Wonder Woman'},
    {id: 8, name: 'Robin'}
  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: HeroService, useValue: heroServiceSpy },
        MessagesService,
        // {provide: APP_BASE_HREF, useValue: '/'}
      ],
      imports: [
        RouterModule.forRoot([]),
        HttpModule
      ]
    })
    .compileComponents();
     // inject both the component and the dependent service.

  }));

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const spy = jasmine.createSpyObj('HeroService', ['getHeroes']);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    heroService = fixture.debugElement.injector.get(HeroService);

  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  xit('should display heroes 2, 3, 4 and 5', fakeAsync(() => {
    spy = spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(mockHeroes));
    component.getHeroes();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const deElements = fixture.debugElement.queryAll(By.css('.hero h4'));

    expect(deElements.length).toBe(4);
    expect(deElements[0].nativeElement.textContent).toBe('Superman');
    expect(deElements[1].nativeElement.textContent).toBe('Iron Man');
    expect(deElements[2].nativeElement.textContent).toBe('Kick-ass');
    expect(deElements[3].nativeElement.textContent).toBe('Thor');
  }));


});
