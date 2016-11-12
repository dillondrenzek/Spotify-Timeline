import { Component, ChangeDetectorRef } from '@angular/core';
import { Http, Request, RequestMethod, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { MetaService } from '../metaService/meta.service';

@Component({
  moduleId: module.id,
  selector: 'app-version',
  templateUrl: './appVersion.component.html',
  styleUrls: ['./appVersion.component.css']
})
export class AppVersion {

  private version: Observable<string>;

  constructor(private metaService: MetaService) {}

  ngOnInit() {
    this.version = this.metaService.getAppVersion();
  }
}
