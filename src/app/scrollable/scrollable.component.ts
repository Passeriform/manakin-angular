import { Component, ContentChildren, QueryList, OnInit, AfterContentInit, HostBinding, Input } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { SplashStateService } from '../services/splash-state.service';

@Component({
  selector: 'app-scrollable',
  templateUrl: './scrollable.component.html',
  styleUrls: ['./scrollable.component.sass']
})

export class ScrollableComponent implements OnInit, AfterContentInit {
  private pageIndex = 0;

  @Input() nosplash: boolean;
  @Input() horizontal: boolean;
  @Input() delta: number;
  @Input() throttle: number;
  @Input() fullpage = true;

  @ContentChildren('page') pages: QueryList<any>;

  constructor(private splashStateService: SplashStateService) {
    fromEvent(window, 'DOMMouseScroll')
      .pipe(throttleTime(this.throttle || 300))
      .subscribe((event) => {
        this.pageScroll(event);
        event.preventDefault();
      });
  }

  @HostBinding('style.-webkit-transform')
  @HostBinding('style.-ms-transform')
  @HostBinding('style.transform') get transform(): string {
    if (this.fullpage) {
      this.delta = 100;
    }
    if (this.horizontal) {
      return 'translateX(' + (-this.delta * this.pageIndex) + 'vw)';
    }
    return 'translateY(' + (-this.delta * this.pageIndex) + 'vh)';
  }

  pageScroll(evt: any) {
    if (evt.axis !== (this.horizontal ? 1 : 2)) { return; }

    const event = evt || window.event; // For older IE
    const wheelDelta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    const limit = event.target.scrollHeight - event.target.clientHeight;

    if (wheelDelta > 0) {
      this.pageShiftUp();
    } else if (wheelDelta < 0) {
      this.pageShiftDown();
    }

    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if (event.preventDefault) {
      event.preventDefault();
    }
  }

  pageShiftUp() {
    this.pageIndex = Math.max(this.pageIndex - 1, 0);
    this.updateSplashState();
  }

  pageShiftDown() {
    this.pageIndex = Math.min(this.pageIndex + 1, this.pages.length - 1);
    this.updateSplashState();
  }

  pageReset() {
    this.pageIndex = 0;
    this.updateSplashState();
  }

  updateSplashState() {
    if (this.pageIndex === 0 && !this.nosplash) {
      this.splashStateService.changeSplashState('focussed');
    } else {
      this.splashStateService.changeSplashState('blur');
    }
  }

  ngOnInit() {
    this.updateSplashState();
  }

  ngAfterContentInit() { }
}
