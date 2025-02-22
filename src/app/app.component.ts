import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RawData } from './utils';
import { User } from './models/workout.model';
import { Workout } from './models/workout.model';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
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

  // For selected user chart
  selectedUser: User | null = null;

  // Chart.js properties
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Workout Minutes',
        data: [],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
      },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  ngOnInit() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = RawData;
      localStorage.setItem('users', JSON.stringify(this.users));
    }

    // Ensure chartData labels are initialized
    this.chartData.labels = this.chartData.labels || [];

    //first selected user
    if (this.users.length > 0) {
      this.selectedUser = this.users[0];
      this.updateChart(this.selectedUser);
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

    // Update the chart
    this.updateChart(user);

    // Reset form
    this.userName = '';
    this.workoutType = 'Running';
    this.workoutMinutes = 0;
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.updateChart(user);
  }

  updateChart(user: User) {
    this.chartData.labels = user.workouts.map((w) => w.type);
    this.chartData.datasets[0].data = user.workouts.map((w) => w.minutes);
    this.chartData = { ...this.chartData }; // Trigger change detection
  }
}
