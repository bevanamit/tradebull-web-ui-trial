import {ElementRef, Injectable} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Subscription, timer} from 'rxjs';
import {SpinnerContainerComponent} from './spinner-container/spinner-container.component';
import {DynamicOverlay} from './dynamic-overlay.service';
import {OverlayRef} from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor(private dynamicOverlay: DynamicOverlay) {
  }

  public showProgress(elRef: ElementRef) {
    if (elRef) {
      const result: ProgressRef = {subscription: null, overlayRef: null};
      result.subscription = timer(500)
      .subscribe(() => {
        this.dynamicOverlay.setContainerElement(elRef.nativeElement);
        const positionStrategy = this.dynamicOverlay.position().global().centerHorizontally().centerVertically();
        result.overlayRef = this.dynamicOverlay.create({
          positionStrategy: positionStrategy,
          hasBackdrop: true
        });
        result.overlayRef.attach(new ComponentPortal(SpinnerContainerComponent));
      });
      return result;
    } else {
      return null;
    }
  }

  detach(result: ProgressRef) {
    if (result) {
      result.subscription.unsubscribe();
      if (result.overlayRef) {
        result.overlayRef.detach();
      }
    }
  }

}

export declare interface ProgressRef {
  subscription: Subscription;
  overlayRef: OverlayRef;
}
