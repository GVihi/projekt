import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PhotoEditorComponent } from './pages/photo-editor/photo-editor.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
{ path: 'home', component: HomeComponent },
{ path: 'photos', component: PhotosComponent },
{ path: 'photo/:id', component: HomeComponent },
{ path: 'photo-editor', component: PhotoEditorComponent },
{ path: 'sign-in', component: SignInComponent},
{ path: 'sign-up', component: SignUpComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
