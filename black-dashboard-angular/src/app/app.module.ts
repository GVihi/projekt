import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { ReverseSearchComponent } from './pages/reverse-search/reverse-search.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { MyPhotosComponent } from './pages/my-photos/my-photos.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DetailPhotoComponent } from './pages/detail-photo/detail-photo.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { ClassifyImageComponent } from './pages/classify-image/classify-image.component';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatFileUploadModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDGNz-Pdq9y9WVbLHWnV3FZ9BjCZZ5x6zs'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ReverseSearchComponent,
    ProfileComponent,
    PhotosComponent,
    MyPhotosComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    DetailPhotoComponent,
    EditProfileComponent,
    ClassifyImageComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
