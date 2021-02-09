import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/pages/authentication/login/login.module';
import { ForgotPasswordModule } from 'app/main/pages/authentication/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './authentication/reset-password/reset-password.module';


@NgModule({
    imports: [
        // Authentication
        LoginModule,
        ForgotPasswordModule,
        ResetPasswordModule,

        // Coming-soon

        // Errors

        // Invoices

        // Maintenance

        // Pricing

        // Profile

        // Search

        // Faq

        // Knowledge base
    ]
})
export class PagesModule
{

}
