import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PlaceholderDirective } from '../placeholderDirective/placeholder.directive';

import { AlertDynamicComponent } from '../shared/alertVersaoImperativa/alert.component';
import { Store } from '@ngrx/store';
import { AppState } from '..';

import * as AuthActions from '../auth/store/authActions';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit, OnDestroy {
  isSignup: boolean = true;

  isLoading: boolean = false;

  private closeAlertBoxSubscription: Subscription;

  private storeSubscription: Subscription;

  error: string | null;

  @ViewChild(PlaceholderDirective, { static: false })
  dynamicAlertBoxHost: PlaceholderDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('auth')
      .subscribe((authState) => {
        this.isLoading = authState.isLoading;
        this.error = authState.error;
        if (this.error) {
          this.showErrorAlert(this.error);
        }
      });
  }

  private showErrorAlert(errorMessage: string) {
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        AlertDynamicComponent
      );

    const hostViewContainerRef = this.dynamicAlertBoxHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentReference = hostViewContainerRef.createComponent(
      alertComponentFactory
    );

    componentReference.instance.message = errorMessage;

    this.closeAlertBoxSubscription =
      componentReference.instance.close.subscribe(() => {
        this.closeAlertBoxSubscription.unsubscribe();
        hostViewContainerRef.clear();
        this.store.dispatch(new AuthActions.ClearError());

        console.log(this.store.select('auth'));
      });
  }

  onAuthFormSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.form.get('email')?.value;
    const password = form.form.get('password')?.value;

    const userData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    if (!this.isSignup) {
      this.store.dispatch(
        new AuthActions.AuthStart({ email: email, password: password })
      );
    } else {
      this.store.dispatch(
        new AuthActions.AuthSignupStart({ email: email, password: password })
      );
    }

    form.reset();
  }

  onSwitchAuth() {
    console.log('test');
    this.isSignup = !this.isSignup;
  }

  ngOnDestroy(): void {
    if (this.closeAlertBoxSubscription) {
      this.closeAlertBoxSubscription.unsubscribe();
    }

    this.storeSubscription.unsubscribe();
  }
}
