import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { AboutComponent } from './about/about.component';
import { TasksComponent } from './tasks/tasks.component';
import { SocketsComponent } from './sockets/sockets.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { UserComponent } from './content/user/user.component';
import { SettingsComponent } from './content/settings/settings.component';
import { PageNotFoundComponent } from './content/page-not-found/page-not-found.component';
import { NewTaskDialogComponent } from './tasks/new-task-dialog/new-task-dialog.component';
import { TasksDonePipe } from './tasks/tasks-done.pipe';
import { LoginComponent } from './login/login.component';
import { AuthGuardComponent as AuthGuard} from './authentication/auth-guard.component';
import {AuthenticationService} from "./authentication/authentication.service";
import {TasksService} from "./tasks/tasks.service";

const appRoutes: Routes = [
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'user', canActivate: [AuthGuard], component: UserComponent },
  { path: 'settings', canActivate: [AuthGuard], component: SettingsComponent },
  { path: 'login', component: LoginComponent },

  { path: '', canActivate: [AuthGuard], redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContentComponent,
    AboutComponent,
    TasksComponent,
    SocketsComponent,
    DashboardComponent,
    UserComponent,
    SettingsComponent,
    PageNotFoundComponent,
    NewTaskDialogComponent,
    TasksDonePipe,
    LoginComponent,
    LoginComponent,
    AuthGuard
  ],
  entryComponents: [
    NewTaskDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
