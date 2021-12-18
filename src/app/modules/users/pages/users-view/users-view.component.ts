import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss'],
})
export class UsersViewComponent implements OnInit {
  public user!: User;
  public phones: string[] = [];

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initLoading());
    this.route.params
      .pipe(switchMap(({ id }) => this.userService.getOne(id)))
      .subscribe((user) => {
        this.user = user;
        this.phones = JSON.parse(user.profile.phones!) || [];
        this.store.dispatch(stopLoading());
      });
  }
}
