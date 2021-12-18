import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

/*Change language to spanish */
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');
/*Change language to spanish */

/* Change language to material table */
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './utils/spanish-paginator-intl';
/* Change language to material table */

/*CONFIG STORE*/
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './state/app.reducer';
import { environment } from 'src/environments/environment';
/*CONFIG STORE */

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { LoadingComponent } from './layouts/loading/loading.component';
import { AlertComponent } from './layouts/alert/alert.component';
import { DeleteDialogComponent } from './layouts/delete-dialog/delete-dialog.component';

import { HttpHeadersService } from './interceptors/http-headers.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoadingComponent,
    AlertComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
