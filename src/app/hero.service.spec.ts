import { TestBed } from '@angular/core/testing';
import { async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MessagesService } from './messages.service';
import { Hero } from './hero';

describe('HeroService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let heroService: HeroService;
  let messagesService: MessagesService;

  const expectedHeroes: Hero[] =
  [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];

  beforeEach(() => TestBed.configureTestingModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
      HeroService,
      HttpClient,
      HttpHandler,
      {provide: APP_BASE_HREF, useValue: '/'}
    ],
    imports: [
      FormsModule,
      RouterModule.forRoot([]),
      HttpModule
    ]

  }));

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });


  xit('should use HeroService', () => {
    heroService = TestBed.get(heroService);
    expect(heroService.getHeroes().subscribe(
      heroes => expect(heroes).toEqual(expectedHeroes, 'expected heroes'),
      fail
    ));
  });



});
