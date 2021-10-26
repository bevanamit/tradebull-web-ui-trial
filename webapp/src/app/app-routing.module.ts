import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './helpers/auth.guard';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {BrokerRegisterComponent} from './broker-register/broker-register.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {TradebullzAlgorithmsComponent} from './tradebullz-algorithms/tradebullz-algorithms.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {NewPasswordComponent} from './reset-password/new-password/new-password.component';
import {EmailPasswordComponent} from './reset-password/email-password/email-password.component';
import {ChartInkComponent} from './chart-ink/chart-ink.component';
import {CoreComponent} from './core/core.component';
import {CustomerSettingsComponent} from './customer-settings/customer-settings.component';
import {ProfileInfoComponent} from './customer-settings/profile-info/profile-info.component';
import {BrokerSettingComponent} from './customer-settings/broker-setting/broker-setting.component';
import {PasswordSettingComponent} from './customer-settings/password-setting/password-setting.component';
import {PaymentMethodComponent} from './customer-settings/payment-method/payment-method.component';
import {FormUnSavedGuard} from './helpers/form-un-saved.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PaytmGatewayComponent} from './customer-settings/payment-method/paytm-gateway/paytm-gateway.component';
import {PaymentStatusComponent} from './customer-settings/payment-method/payment-status/payment-status.component';
import {PricingComponent} from './pricing/pricing.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { WebsocketComponent } from './common/websocket/websocket.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
    // {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'resetPassword', component: ResetPasswordComponent},
    {path: 'newPassword', component: NewPasswordComponent},
    {path: 'emailPassword', component: EmailPasswordComponent},
    {path: 'knowledgeBase', component: TutorialComponent},
    {path: 'Websocket', component: WebsocketComponent},
    {path: 'verifyEmail', component: VerifyEmailComponent},
    {
        path: 'home', component: CoreComponent,
        children: [
            {path: 'profile', component: UserProfileComponent},
            {path: 'registerbroker', component: BrokerRegisterComponent},
            {path: 'tradebullz-algorithms', component: TradebullzAlgorithmsComponent},
            {path: 'chart-ink', component: ChartInkComponent},
            {path: 'watchlist', component: WatchlistComponent},
            {path: 'pricing',component: PricingComponent}, 
            {path: 'dashboard',component: DashboardComponent},
            {
                path: 'settings', component: CustomerSettingsComponent,
                children: [
                    {path: 'profile', component: ProfileInfoComponent, canDeactivate: [FormUnSavedGuard]},
                    {path: 'broker', component: BrokerSettingComponent, canDeactivate: [FormUnSavedGuard]},
                    {path: 'security', component: PasswordSettingComponent, canDeactivate: [FormUnSavedGuard]},
                    {path: 'pricing',component: PricingComponent, canDeactivate: [FormUnSavedGuard]},
                    {path: 'payment', component: PaymentMethodComponent, 
                        children: [
                        {path: 'paytm', component: PaytmGatewayComponent,},
                        {path: 'status', component: PaymentStatusComponent},
                        
                    ]}]
            },
            {path: '**', redirectTo: ''},
        ],
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {
}
