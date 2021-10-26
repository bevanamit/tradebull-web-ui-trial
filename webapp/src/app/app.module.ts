import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AlertComponent} from './common/alert/alert.component';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {BrokerRegisterComponent} from './broker-register/broker-register.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {FormErrorComponent} from './common/form-error/form-error.component';
import {FormErrorContainerComponent} from './common/form-error-container/form-error-container.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {UserConfigComponent} from './user-config/user-config.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {NewPasswordComponent} from './reset-password/new-password/new-password.component';
import {EmailPasswordComponent} from './reset-password/email-password/email-password.component';
import {ChartInkComponent} from './chart-ink/chart-ink.component';
import {HostDirective} from './helpers/directives/host.directive';
import {CdkTableModule} from '@angular/cdk/table';
import {MatDialogModule} from '@angular/material/dialog';
import {ChartInkAlgoAddComponent} from './chart-ink/chart-ink-algo-add/chart-ink-algo-add.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ChartInkAlgoTestComponent} from './chart-ink/chart-ink-algo-test/chart-ink-algo-test.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatSelectModule} from '@angular/material/select';
import {NotifierComponent} from './common/notifier/notifier.component';
import {DatePipe} from './helpers/directives/date.pipe';
import { CoreComponent } from './core/core.component';
import { SideNavComponent } from './core/side-nav/side-nav.component';
import { CustomerSettingsComponent } from './customer-settings/customer-settings.component';
import { ProfileInfoComponent } from './customer-settings/profile-info/profile-info.component';
import { BrokerSettingComponent } from './customer-settings/broker-setting/broker-setting.component';
import { PasswordSettingComponent } from './customer-settings/password-setting/password-setting.component';
import { PaymentMethodComponent } from './customer-settings/payment-method/payment-method.component';
import {MatIconModule} from '@angular/material/icon';
import {DynamicOverlay} from './common/spinner/dynamic-overlay.service';
import {DynamicOverlayContainer} from './common/spinner/dynamic-overlay-container.service';
import {SpinnerContainerComponent} from './common/spinner/spinner-container/spinner-container.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule } from '@angular/material-moment-adapter/';
import {MatNativeDateModule} from '@angular/material/core';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { TradebullzAlgorithmsComponent } from './tradebullz-algorithms/tradebullz-algorithms.component';
import { AlertLoginscreensComponent } from './common/alert-loginscreens/alert-loginscreens.component';
import { TermsConditionsComponent } from './common/terms-conditions/terms-conditions.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { PaytmGatewayComponent } from './customer-settings/payment-method/paytm-gateway/paytm-gateway.component';
import { PaymentStatusComponent } from './customer-settings/payment-method/payment-status/payment-status.component';
import { PricingComponent } from './pricing/pricing.component';
import { AuthGuard } from './helpers/canActivate';
import { TutorialComponent } from './tutorial/tutorial.component';
import { WebsocketComponent } from './common/websocket/websocket.component';
import { WatchlistComponent } from './watchlist/watchlist.component';



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        UserProfileComponent,
        BrokerRegisterComponent,
        VerifyEmailComponent,
        FormErrorComponent,
        FormErrorContainerComponent,
        DashboardComponent,
        UserConfigComponent,
        ResetPasswordComponent,
        NewPasswordComponent,
        EmailPasswordComponent,
        ChartInkComponent,
        HostDirective,
        ChartInkAlgoAddComponent,
        ChartInkAlgoTestComponent,
        NotifierComponent,
        DatePipe,
        CoreComponent,
        SideNavComponent,
        CustomerSettingsComponent,
        ProfileInfoComponent,
        BrokerSettingComponent,
        PasswordSettingComponent,
        PaymentMethodComponent,
        SpinnerContainerComponent,
        TradebullzAlgorithmsComponent,
        AlertLoginscreensComponent,
        TermsConditionsComponent,
        PaytmGatewayComponent,
        PaymentStatusComponent,
        PricingComponent,
        TutorialComponent,
        WebsocketComponent,
        WatchlistComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        ClipboardModule,
        OverlayModule,
        MatSlideToggleModule,
        CdkTableModule,
        MatDialogModule,
        MatMenuModule,
        MatButtonModule,
        MatTooltipModule,
        NgxMatSelectSearchModule,
        MatSelectModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatFormFieldModule,
        MatGridListModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatNativeDateModule,
        MatTableModule,
        GooglePayButtonModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        DatePipe,
        DynamicOverlayContainer,
        DynamicOverlay,
        AuthGuard,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
