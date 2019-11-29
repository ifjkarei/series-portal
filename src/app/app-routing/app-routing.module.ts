import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from "../sites/main-page/main-page.component";
import { LoginComponent } from '../sites/user/login/login.component';
import { RegisterComponent } from '../sites/user/register/register.component';
import { UserDetailComponent } from '../sites/user/user-detail/user-detail.component';
import { NewSeriesComponent } from '../sites/series/new-series/new-series.component';
import { AllSeriesComponent } from '../sites/series/all-series/all-series.component';
import { ToBeWatchedComponent } from '../sites/series/to-be-watched/to-be-watched.component';
import { NowWatchingComponent } from '../sites/series/now-watching/now-watching.component';
import { WatchedComponent } from '../sites/series/watched/watched.component';
import { RecommendedComponent } from '../sites/series/recommended/recommended.component';
import { ApproveComponent } from '../sites/series/approve/approve.component';

const routes: Routes = [
  { path: '', redirectTo: '/main-page', pathMatch: 'full' },
  { path: 'main-page', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'new', component: NewSeriesComponent },
  { path: 'all', component: AllSeriesComponent },
  { path: 'tobewatched', component: ToBeWatchedComponent },
  { path: 'nowwatching', component: NowWatchingComponent },
  { path: 'watched', component: WatchedComponent },
  { path: 'recommended', component: RecommendedComponent },
  { path: 'approve', component: ApproveComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
