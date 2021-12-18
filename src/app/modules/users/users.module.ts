import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UsersNewComponent } from './pages/users-new/users-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersViewComponent } from './pages/users-view/users-view.component';
import { UsersEditComponent } from './pages/users-edit/users-edit.component';
import { UserProfileFormComponent } from './components/user-profile-form/user-profile-form.component';
import { UsersProfilePhotoComponent } from './components/users-profile-photo/users-profile-photo.component';

@NgModule({
  declarations: [UsersComponent, UsersListComponent, UsersNewComponent, UsersViewComponent, UsersEditComponent, UserProfileFormComponent, UsersProfilePhotoComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ],
})
export class UsersModule {}
