import { Injectable } from '@angular/core';
import { User, Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  // private readonly STORAGE_KEY = 'userData'; // Key for localStorage
  // private userData: User[] = [];
  // constructor() {
  //   // Retrieve data from localStorage when the service is initialized
  //   const storedData = localStorage.getItem(this.STORAGE_KEY);
  //   if (storedData) {
  //     this.userData = JSON.parse(storedData);
  //   } else {
  //     // Default data if localStorage is empty
  //     this.userData = [
  //       {
  //         id: 1,
  //         name: 'John Doe',
  //         workouts: [
  //           { type: 'Running', minutes: 30 },
  //           { type: 'Cycling', minutes: 45 },
  //         ],
  //       },
  //       {
  //         id: 2,
  //         name: 'Jane Smith',
  //         workouts: [
  //           { type: 'Swimming', minutes: 60 },
  //           { type: 'Running', minutes: 20 },
  //         ],
  //       },
  //     ];
  //     this.saveToLocalStorage(); // Save default data to localStorage
  //   }
  // }
  // // Get all users
  // getUsers(): User[] {
  //   return this.userData;
  // }
  // // Add a new user
  // addUser(user: User): void {
  //   this.userData.push(user);
  //   this.saveToLocalStorage(); // Save updated data to localStorage
  // }
  // // Search users by name
  // searchUsers(name: string): User[] {
  //   return this.userData.filter((user) =>
  //     user.name.toLowerCase().includes(name.toLowerCase())
  //   );
  // }
  // // Filter users by workout type
  // filterUsersByWorkoutType(type: string): User[] {
  //   return this.userData.filter((user) =>
  //     user.workouts.some((workout) => workout.type === type)
  //   );
  // }
  // // Helper method to save data to localStorage
  // private saveToLocalStorage(): void {
  //   localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.userData));
  // }
}
