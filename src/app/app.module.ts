import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RoutesCardComponent } from "./pages/routes/routes-card/routes-card.component";
import { RoutesListComponent } from "./pages/routes/routes-list/routes-list.component";
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ErrorInterceptor } from "./_interceptors/error.interceptor";
import { JwtInterceptor } from "./_interceptors/jwt.interceptor";
import { AboutComponent } from './pages/about/about.component';
import { CareerComponent } from './pages/career/career.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { TicketConfirmComponent } from './pages/ticket-confirm/ticket-confirm.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        HomeComponent,
        RoutesCardComponent,
        RoutesListComponent,
        RegisterComponent,
        LoginComponent,
        AboutComponent,
        CareerComponent,
        AdminPanelComponent,
        TicketConfirmComponent
    ],
    imports: [
    BrowserModule,        
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),

    
    
    
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,multi:true},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})


export class AppModule{}