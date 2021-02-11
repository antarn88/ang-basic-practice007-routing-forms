import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../model/event';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  event: Event = new Event();

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => this.eventService.get(Number(params.id)).subscribe(
        event => {
          this.event = event;
        }
      )
    )
  }

  onFormSubmit(form: NgForm): void {
    const newEvent = { ...form.value, location: { address: form.value.address, city: form.value.city, country: form.value.country } };
    delete newEvent.address;
    delete newEvent.city;
    delete newEvent.country;
    this.eventService.update(newEvent);
  }
}
