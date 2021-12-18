import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { initLoading, stopLoading } from 'src/app/state/actions/ui.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
})
export class UsersEditComponent implements OnInit {
  public user!: User;

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
        this.store.dispatch(stopLoading());
      });
  }
}
