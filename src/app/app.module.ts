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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from "@angular/common";
import { HasRoleDirective } from "./_directives/has-role.directive";
import { AllRoutesComponent } from './pages/admin/all-routes/all-routes.component';
import { AllSchedulesComponent } from './pages/admin/all-schedules/all-schedules.component';
import { AllDistrictsComponent } from './pages/admin/all-districts/all-districts.component';
import { AllTicketsComponent } from './pages/admin/all-tickets/all-tickets.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DistUpdateModalComponent } from './pages/admin/modals/dist-update-modal/dist-update-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeleteConfirmModalComponent } from './pages/admin/modals/delete-confirm-modal/delete-confirm-modal.component';
import { DistCreateModalComponent } from './pages/admin/modals/dist-create-modal/dist-create-modal.component';
import { ToastComponent } from './pages/toast/toast.component';
import { RoutCreateModalComponent } from './pages/admin/modals/rout-create-modal/rout-create-modal.component';
registerLocaleData(localeRu);

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
        TicketConfirmComponent,
        HasRoleDirective,
        AllRoutesComponent,
        AllSchedulesComponent,
        AllDistrictsComponent,
        AllTicketsComponent,
        DistUpdateModalComponent,
        DeleteConfirmModalComponent,
        DistCreateModalComponent,
        ToastComponent,
        RoutCreateModalComponent,
    ],
    imports: [
    BrowserModule,        
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    
    
    
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,multi:true},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})


export class AppModule{}