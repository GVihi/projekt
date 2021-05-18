import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { PhotoCardComponent } from './components/photo-card/photo-card.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { PhotoEditorComponent } from './pages/photo-editor/photo-editor.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { UsersAdminTableComponent } from './components/users-admin-table/users-admin-table.component';
import { PhotosAdminTableComponent } from './components/photos-admin-table/photos-admin-table.component';
import { PhotoDetailsComponent } from './pages/photo-details/photo-details.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyAlbumsComponent } from './pages/my-albums/my-albums.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavbarComponent,
    PhotosComponent,
    PhotoCardComponent,
    PhotoEditorComponent,
    SideNavbarComponent,
    UsersAdminTableComponent,
    PhotosAdminTableComponent,
    PhotoDetailsComponent,
    SignInComponent,
    SignUpComponent,
    AdminComponent,
    SearchResultsComponent,
    ProfileComponent,
    MyAlbumsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
