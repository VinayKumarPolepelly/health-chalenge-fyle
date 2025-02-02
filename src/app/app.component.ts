import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RawData } from './utils';
import { User } from './models/workout.model';
import { Workout } from './models/workout.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add these here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'health-challenge';
  userName: string = '';
  workoutType: string = 'Running';
  workoutMinutes: number = 0;
  users: User[] = [];
  searchText: string = '';
  selectedCategory: string = '';

  ngOnInit() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = RawData;
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  getTotalMinutes(workouts: Workout[]): number {
    return workouts.reduce((sum, workout) => sum + workout.minutes, 0);
  }
  filteredUsers(): User[] {
    return this.users.filter((user) => {
      const matchesName = user.name
        .toLowerCase()
        .includes(this.searchText.toLowerCase());
      const matchesCategory =
        !this.selectedCategory ||
        user.workouts.some((workout) => workout.type === this.selectedCategory);

      return matchesName && matchesCategory;
    });
  }
  onSubmit() {
    const trimmedName = this.userName.trim();
    if (!trimmedName || this.workoutMinutes <= 0) return;

    let user = this.users.find(
      (u) => u.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (user) {
      user.workouts.push({
        type: this.workoutType,
        minutes: this.workoutMinutes,
      });
    } else {
      user = {
        id: this.users.length
          ? Math.max(...this.users.map((u) => u.id)) + 1
          : 1,
        name: trimmedName,
        workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }],
      };
      this.users.push(user);
    }

    localStorage.setItem('users', JSON.stringify(this.users));

    // Reset form
    this.userName = '';
    this.workoutType = 'Running';
    this.workoutMinutes = 0;
  }
}
