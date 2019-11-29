import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AutoCompleteModule } from "primeng/primeng";
import { MessageModule } from "primeng/message";
import { FileUploadModule } from "primeng/primeng";
import { DropdownModule } from "primeng/primeng";
import { PanelModule} from "primeng/panel";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from "primeng/dialog";
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogModule } from "primeng/primeng";
import { ToastModule } from 'primeng/toast';
import { ChipsModule } from 'primeng/chips';
import { PickListModule } from 'primeng/picklist';
import { PasswordModule } from 'primeng/password';
import { SliderModule } from 'primeng/slider';
import { ListboxModule } from 'primeng/listbox';
import { TabViewModule } from "primeng/primeng";
import { CarouselModule } from "primeng/primeng";
import { EditorModule } from 'primeng/editor';
import { SpinnerModule } from 'primeng/spinner';

import { AuthGuard } from "./auth.guard";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from "./service/user.service";
import { SeriesService } from "./service/series.service";
import { AuthService } from "./service/auth.service";
import { GenreService } from "./service/genre.service";

import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeHu from '@angular/common/locales/hu';

import { AppComponent } from './app.component';
import { MainPageComponent } from './sites/main-page/main-page.component';
import { LoginComponent } from './sites/user/login/login.component';
import { RegisterComponent } from './sites/user/register/register.component';
import { UserDetailComponent } from './sites/user/user-detail/user-detail.component';
import { MenuComponent } from './sites/menu/menu.component';
import { NewSeriesComponent } from './sites/series/new-series/new-series.component';
import { AllSeriesComponent } from './sites/series/all-series/all-series.component';
import { ToBeWatchedComponent } from './sites/series/to-be-watched/to-be-watched.component';
import { NowWatchingComponent } from './sites/series/now-watching/now-watching.component';
import { WatchedComponent } from './sites/series/watched/watched.component';
import { RecommendedComponent } from './sites/series/recommended/recommended.component';
import { ApproveComponent } from './sites/series/approve/approve.component';


registerLocaleData(localeHu);

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    UserDetailComponent,
    MenuComponent,
    NewSeriesComponent,
    AllSeriesComponent,
    ToBeWatchedComponent,
    NowWatchingComponent,
    WatchedComponent,
    RecommendedComponent,
    ApproveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    MessageModule,
    FileUploadModule,
    DropdownModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    CheckboxModule,
    MessagesModule,
    MenubarModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    DataViewModule,
    ConfirmDialogModule,
    ToastModule,
    ChipsModule,
    PickListModule,
    PasswordModule,
    SliderModule,
    ListboxModule,
    TabViewModule,
    CarouselModule,
    EditorModule,
    SpinnerModule
  ],
  providers: [AuthService,
              UserService,
              SeriesService,
              GenreService,
              {provide: HTTP_INTERCEPTORS, useClass: AuthGuard, multi: true},
              {provide: LOCALE_ID, useValue: "hu"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
