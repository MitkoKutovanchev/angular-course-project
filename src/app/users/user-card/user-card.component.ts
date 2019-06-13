import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import UserInterface from '../models/user.model';
import { Router } from '@angular/router';
import UsersService from "../users.service";
import AuthService from '../../auth/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: UserInterface;
  @Output() onDelete: EventEmitter<number> = new EventEmitter();

  @Input() isAdmin: boolean = false;
  @Input() currentUserId: number;
  constructor(private router: Router,
    private usersService: UsersService) { }

  ngOnInit() {
  }

  onDeleteClicked() {
    this.onDelete.emit(this.user.id);
  }

  onBlockClicked() {
    this.user.isBlocked ? this.user.isBlocked = false : this.user.isBlocked = true;
    this.usersService.addNewUser(this.user)
      .subscribe(() => {
        console.log('USER UPDATED');
      })
  }

  onUserEdit() {
    this.router.navigate(['users/add', this.user.id]);
  }

  get canManipulate(): boolean {
    return this.isAdmin && this.currentUserId !== this.user.id;
  }
}
