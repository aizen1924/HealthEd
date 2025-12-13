import { Component } from '@angular/core';
import { Router } from '@angular/router'; // <--- CRITICAL IMPORT
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    standalone: false
})
export class Tab1Page {

 // In src/app/tab1/tab1.page.ts

  allBooks = [
    {
      id: 101,
      title: 'Iwas UTI Tips',
      author: 'School Health',
      category: 'Hygiene',
      // Water/Blue theme
      image: 'https://placehold.co/250x350/3498db/FFF?text=UTI+Prevention' 
    },
    {
      id: 102,
      title: 'Managing Lagnat',
      author: 'Nurse Joy',
      category: 'First Aid',
      // Red/Warm theme
      image: 'https://placehold.co/250x350/e74c3c/FFF?text=Lagnat+Care' 
    },
    {
      id: 103,
      title: 'Fight Malnutrition',
      author: 'Nutri-Team',
      category: 'Nutrition',
      // Green/Food theme
      image: 'https://placehold.co/250x350/2ecc71/FFF?text=Healthy+Eating' 
    },
    {
      id: 4,
      title: 'First Aid Essentials',
      author: 'Red Cross',
      category: 'Medical',
      image: 'https://placehold.co/250x350/c0392b/FFF?text=First+Aid'
    },
    {
      id: 5,
      title: 'Mental Health 101',
      author: 'Guidance Counselor',
      category: 'Wellness',
      image: 'https://placehold.co/250x350/9b59b6/FFF?text=Mental+Health'
    }
  ];

  displayedBooks = [...this.allBooks];
  savedBookIds: number[] = [];

  // <--- CRITICAL: You must define 'private router: Router' here
  constructor(private router: Router, private toastCtrl: ToastController) {}

  ionViewWillEnter() {
    const stored = localStorage.getItem('healthEdBookmarks');
    if (stored) {
      this.savedBookIds = JSON.parse(stored);
    }
  }

  // <--- CRITICAL: This is the function your HTML button calls
  openBookDetails(bookId: number) {
    console.log("Navigating to book:", bookId); // Debug check
    this.router.navigate(['/book-details', bookId]);
  }

  // --- Bookmark Logic ---
  isBookmarked(book: any): boolean {
    return this.savedBookIds.includes(book.id);
  }

  toggleBookmark(book: any) {
    if (this.isBookmarked(book)) {
      this.savedBookIds = this.savedBookIds.filter(id => id !== book.id);
      this.presentToast('Bookmark removed', 'trash');
    } else {
      this.savedBookIds.push(book.id);
      this.presentToast('Added to bookmarks', 'bookmark');
    }
    localStorage.setItem('healthEdBookmarks', JSON.stringify(this.savedBookIds));
  }

  filterBooks(event: any) {
    const query = event.target.value.toLowerCase();
    if (query && query.trim() !== '') {
      this.displayedBooks = this.allBooks.filter((book) => {
        return (book.title.toLowerCase().indexOf(query) > -1) || 
               (book.category.toLowerCase().indexOf(query) > -1);
      });
    } else {
      this.displayedBooks = [...this.allBooks];
    }
  }

  async presentToast(msg: string, iconName: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      icon: iconName,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }
}