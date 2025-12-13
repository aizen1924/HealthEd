import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router to navigate
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
    standalone: false
})
export class Tab3Page {

  // 1. MUST MATCH THE LIST IN TAB 1 EXACTLY
  allBooks = [
    {
      id: 101,
      title: 'Iwas UTI Tips',
      author: 'School Health',
      category: 'Hygiene',
      image: 'https://placehold.co/250x350/3498db/FFF?text=UTI+Prevention'
    },
    {
      id: 102,
      title: 'Managing Lagnat',
      author: 'Nurse Joy',
      category: 'First Aid',
      image: 'https://placehold.co/250x350/e74c3c/FFF?text=Lagnat+Care'
    },
    {
      id: 103,
      title: 'Fight Malnutrition',
      author: 'Nutri-Team',
      category: 'Nutrition',
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

  savedBooks: any[] = [];

  constructor(private router: Router, private toastCtrl: ToastController) {}

  // 2. RELOAD DATA AUTOMATICALLY
  ionViewWillEnter() {
    this.loadBookmarks();
  }

  loadBookmarks() {
    // Read the key saved by Tab 1
    const storedIds = localStorage.getItem('healthEdBookmarks');
    
    if (storedIds) {
      const ids: number[] = JSON.parse(storedIds);
      // Filter master list to show only saved books
      this.savedBooks = this.allBooks.filter(book => ids.includes(book.id));
    } else {
      this.savedBooks = [];
    }
  }

  // 3. REMOVE BOOKMARK
  removeBookmark(bookId: number) {
    // Remove from screen
    this.savedBooks = this.savedBooks.filter(book => book.id !== bookId);

    // Update storage
    const currentIds = this.savedBooks.map(book => book.id);
    localStorage.setItem('healthEdBookmarks', JSON.stringify(currentIds));

    this.presentToast('Bookmark removed', 'trash');
  }

  // 4. OPEN BOOK (Same logic as Tab 1)
  openBookDetails(bookId: number) {
    this.router.navigate(['/book-details', bookId]);
  }

  async presentToast(message: string, icon: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      icon: icon,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }
}