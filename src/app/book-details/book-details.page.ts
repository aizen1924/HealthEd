import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { NavController, ToastController } from '@ionic/angular'; // 1. Import ToastController

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.page.html',
    styleUrls: ['./book-details.page.scss'],
    standalone: false
})
export class BookDetailsPage implements OnInit {

  book: any;

  allBooks = [
    {
      id: 101,
      title: 'Iwas UTI Tips',
      author: 'School Health',
      category: 'Hygiene',
      image: 'https://placehold.co/250x350/3498db/FFF?text=UTI+Prevention',
      description: 'UTI (Urinary Tract Infection) is common among students. \n\nPREVENTION TIPS:\n1. Drink plenty of water (8-10 glasses/day).\n2. Don’t hold your pee for too long.\n3. Practice proper hygiene (wipe front to back).\n\nIf you feel pain while peeing, visit the school clinic immediately.'
    },
    {
      id: 102,
      title: 'Managing Lagnat',
      author: 'Nurse Joy',
      category: 'First Aid',
      image: 'https://placehold.co/250x350/e74c3c/FFF?text=Lagnat+Care',
      description: 'Lagnat (Fever) means your body is fighting a virus or bacteria. \n\nWHAT TO DO:\n1. Rest immediately. No strenuous activities.\n2. Drink lots of water or juice to stay hydrated.\n3. Use a cool, damp towel on your forehead (sponge bath).\n4. Check temperature regularly. If it exceeds 38°C, take medicine as prescribed.'
    },
    {
      id: 103,
      title: 'Fight Malnutrition',
      author: 'Nutri-Team',
      category: 'Nutrition',
      image: 'https://placehold.co/250x350/2ecc71/FFF?text=Healthy+Eating',
      description: 'Malnutrition affects your ability to study and play. \n\nREMEMBER "PINGGANG PINOY":\n• GO Foods: Rice, bread (Energy)\n• GROW Foods: Chicken, egg, milk (Muscles)\n• GLOW Foods: Fruits & Vegetables (Immunity)\n\nAvoid junk food and sodas to stay strong and smart!'
    },
    {
      id: 4,
      title: 'First Aid Essentials',
      author: 'Red Cross',
      category: 'Medical',
      image: 'https://placehold.co/250x350/c0392b/FFF?text=First+Aid',
      description: 'A must-have guide for emergencies. Learn CPR, how to treat burns, cuts, and recognizing signs of stroke or heart attack.'
    },
    {
      id: 5,
      title: 'Mental Health 101',
      author: 'Guidance Counselor',
      category: 'Wellness',
      image: 'https://placehold.co/250x350/9b59b6/FFF?text=Mental+Health',
      description: 'Your mental health is just as important as physical health. Learn to recognize stress, practice breathing exercises, and know when to ask for help.'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private toastCtrl: ToastController // 2. Inject ToastController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.book = this.allBooks.find(b => b.id === parseInt(id));
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  // 3. SPECIAL BUTTON (Optional, if you kept the secondary button)
  openInteractiveGuide() {
    this.router.navigate(['/uti-tips']);
  }

  // 4. MAIN START READING FUNCTION
  // Connect this to your "Start Reading" button in HTML
 async startReading() {
    if (this.book.id === 101) {
      this.router.navigate(['/uti-tips']); 
    } 
    else if (this.book.id === 102) {
      this.router.navigate(['/lagnat-care']); 
    } 
    else if (this.book.id === 103) {
      this.router.navigate(['/fight-malnutrition']);
    }
    else if (this.book.id === 4) {
      this.router.navigate(['/first-aid']);
    }
    else if (this.book.id === 5) {
      this.router.navigate(['/mental-health']); // <--- NEW LINK
    }
    else {
      // For all other books
      const toast = await this.toastCtrl.create({
        message: 'Interactive content for this book is coming soon!',
        duration: 2000,
        position: 'bottom',
        color: 'medium'
      });
      toast.present();
    }
  }
}