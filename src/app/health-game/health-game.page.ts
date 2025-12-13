import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

@Component({
    selector: 'app-health-game',
    templateUrl: './health-game.page.html',
    styleUrls: ['./health-game.page.scss'],
    standalone: false
})
export class HealthGamePage implements OnInit, OnDestroy {

  activeGame: any = null;
  activeGameData: any = null;
  
  // Game State
  currentStep: number = 0;
  score: number = 0;
  maxScore: number = 0;
  showResults: boolean = false;
  hasAnswered: boolean = false;
  selectedAnswer: string = '';
  feedbackMessage: string = '';
  explanationText: string = '';
  
  combo: number = 0;          
  patientHealth: number = 100; 
  isWrongAnimation: boolean = false; 

  gameTimer: number = 30;
  timerInterval: any;

  // --- NEW: Audio Objects ---
  // We load them here so they are ready to play instantly
  sfxCorrect = new Audio('assets/sounds/correct.mp3');
  sfxWrong = new Audio('assets/sounds/wrong.mp3');
  sfxWin = new Audio('assets/sounds/win.mp3');
  sfxLose = new Audio('assets/sounds/lose.mp3');

  constructor(private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.stopTimer();
  }

  // --- HELPER: Play Sound ---
  playSound(type: 'correct' | 'wrong' | 'win' | 'lose') {
    let audio: HTMLAudioElement;
    
    switch (type) {
      case 'correct': audio = this.sfxCorrect; break;
      case 'wrong': audio = this.sfxWrong; break;
      case 'win': audio = this.sfxWin; break;
      case 'lose': audio = this.sfxLose; break;
    }

    if (audio) {
      audio.currentTime = 0; // Rewind to start (allows rapid playing)
      audio.play().catch(e => console.log('Audio error:', e));
    }
  }

  // --- DATA SOURCES (Unchanged) ---
  getTriviaData() {
    return {
      questions: [
        { 
          question: "How long should you wash your hands to kill germs?", 
          options: ["5 seconds", "20 seconds", "1 minute", "No need if they look clean"], 
          answer: "20 seconds",
          explanation: "Sing 'Happy Birthday' twice! 20 seconds is needed to remove viruses."
        },
        { 
          question: "How often should you replace your toothbrush?", 
          options: ["Every year", "Every 3-4 months", "When I lose it", "Every week"], 
          answer: "Every 3-4 months",
          explanation: "Worn-out bristles can't clean teeth effectively and may harbor bacteria."
        },
        { 
          question: "Which of these causes body odor?", 
          options: ["Sweat itself", "Bacteria breaking down sweat", "Drinking water", "Wearing cotton"], 
          answer: "Bacteria breaking down sweat",
          explanation: "Sweat is odorless! The smell comes from bacteria living on your skin."
        },
        { 
          question: "To prevent acne, you should avoid:", 
          options: ["Washing your face", "Touching your face", "Drinking water", "Sleeping early"], 
          answer: "Touching your face",
          explanation: "Your hands carry oils and germs that clog pores and cause pimples."
        },
        { 
          question: "What is the best way to prevent head lice?", 
          options: ["Wash hair daily", "Don't share combs/hats", "Cut hair short", "Use gel"], 
          answer: "Don't share combs/hats",
          explanation: "Lice crawl from object to head. Never share personal hair items!"
        }
      ]
    };
  }

  getTriageData() {
    return {
      scenarios: [
        { 
          text: "A classmate touches a hot pot and gets a minor burn. Action?", 
          image: "https://placehold.co/600x300/e67e22/ffffff?text=Minor+Burn",
          choices: [
            { label: "Apply Toothpaste", correct: false, feedback: "No! Chemicals irritate the burn." },
            { label: "Run Cool Water", correct: true, feedback: "Correct! Cool water soothes and stops burning." },
            { label: "Pop the blisters", correct: false, feedback: "Never pop blisters! It causes infection." }
          ]
        },
        { 
          text: "Someone is choking. They are holding their throat and can't speak.", 
          image: "https://placehold.co/600x300/c0392b/ffffff?text=Choking",
          choices: [
            { label: "Give water", correct: false, feedback: "Water can make it worse!" },
            { label: "Pat back gently", correct: false, feedback: "Too gentle won't help." },
            { label: "Heimlich Maneuver", correct: true, feedback: "Yes! Abdominal thrusts dislodge the object." }
          ]
        },
        { 
          text: "Deep cut on the arm. It's bleeding heavily.", 
          image: "https://placehold.co/600x300/e74c3c/ffffff?text=Heavy+Bleeding",
          choices: [
            { label: "Apply direct pressure", correct: true, feedback: "Correct! Pressure stops blood flow." },
            { label: "Wash with soap", correct: false, feedback: "Too much bleeding for soap right now." },
            { label: "Leave it open", correct: false, feedback: "You must stop the blood loss!" }
          ]
        },
        { 
          text: "A friend sprained their ankle during PE class.", 
          image: "https://placehold.co/600x300/3498db/ffffff?text=Sprained+Ankle",
          choices: [
            { label: "Massage it hard", correct: false, feedback: "Massage increases swelling!" },
            { label: "Walk it off", correct: false, feedback: "Walking causes more damage." },
            { label: "Rest & Ice (R.I.C.E)", correct: true, feedback: "Rest, Ice, Compression, Elevation reduces swelling." }
          ]
        },
        { 
          text: "Someone faints and is lying on the floor breathing.", 
          image: "https://placehold.co/600x300/95a5a6/ffffff?text=Fainting",
          choices: [
            { label: "Slap face to wake", correct: false, feedback: "Never slap a patient!" },
            { label: "Raise legs slightly", correct: true, feedback: "Helps blood flow back to the brain." },
            { label: "Pour water on face", correct: false, feedback: "Choking hazard!" }
          ]
        }
      ]
    };
  }

  getNutritionData() {
    return {
      items: [
        { name: "Rice (Kanin)", category: "GO", emoji: "🍚", info: "Carbs give you ENERGY to move!" },
        { name: "Chicken", category: "GROW", emoji: "🍗", info: "Protein builds your MUSCLES!" },
        { name: "Squash (Kalabasa)", category: "GLOW", emoji: "🎃", info: "Vitamins improve your EYESIGHT." },
        { name: "Bread", category: "GO", emoji: "🍞", info: "Whole grains give lasting ENERGY." },
        { name: "Egg", category: "GROW", emoji: "🥚", info: "Great source of protein for growth." },
        { name: "Orange", category: "GLOW", emoji: "🍊", info: "Vitamin C fights off sickness!" },
        { name: "Noodles", category: "GO", emoji: "🍜", info: "Quick energy for the body." },
        { name: "Milk", category: "GROW", emoji: "🥛", info: "Calcium makes BONES strong." },
        { name: "Malunggay", category: "GLOW", emoji: "🌿", info: "Superfood packed with vitamins!" },
        { name: "Fish", category: "GROW", emoji: "🐟", info: "Brain food rich in Omega-3." }
      ]
    };
  }

  // --- LAUNCHER ---
  launchGame(gameId: string) {
    this.resetState();
    
    if (gameId === 'trivia') {
      this.activeGame = { id: 'trivia', title: 'Hygiene Master' };
      this.activeGameData = this.getTriviaData();
      this.maxScore = this.activeGameData.questions.length;
    } 
    else if (gameId === 'triage') {
      this.activeGame = { id: 'triage', title: 'First Aid Hero' };
      this.activeGameData = this.getTriageData();
      this.maxScore = this.activeGameData.scenarios.length;
    }
    else if (gameId === 'nutrition') {
      this.activeGame = { id: 'nutrition', title: 'Pinggang Pinoy' };
      this.activeGameData = this.getNutritionData();
      this.maxScore = this.activeGameData.items.length;
      this.startTimer();
    }
  }

  resetState() {
    this.currentStep = 0;
    this.score = 0;
    this.combo = 0;
    this.patientHealth = 100;
    this.showResults = false;
    this.hasAnswered = false;
    this.selectedAnswer = '';
    this.feedbackMessage = '';
    this.explanationText = '';
    this.activeGame = null;
    this.stopTimer();
    this.gameTimer = 45; 
  }

  quitGame() {
    if (this.activeGame) {
      this.resetState();
    } else {
      this.router.navigate(['/tabs/tab2']);
    }
  }

  // --- LOGIC UPDATED WITH AUDIO ---

  async handleTriviaAnswer(option: string) {
    if (this.hasAnswered) return;
    this.hasAnswered = true;
    this.selectedAnswer = option;
    
    const currentQ = this.activeGameData.questions[this.currentStep];
    const isCorrect = option === currentQ.answer;
    
    this.explanationText = currentQ.explanation;

    if (isCorrect) {
      this.score++;
      this.combo++;
      this.feedbackMessage = "Correct!";
      this.playSound('correct'); // PLAY SOUND
      await Haptics.impact({ style: ImpactStyle.Medium });
    } else {
      this.combo = 0;
      this.feedbackMessage = "Oops!";
      this.playSound('wrong'); // PLAY SOUND
      this.triggerShake();
      await Haptics.notification({ type: NotificationType.Error });
    }
  }

  async handleTriageChoice(choice: any) {
    if (choice.correct) {
      this.score++;
      this.playSound('correct'); // PLAY SOUND
      await Haptics.impact({ style: ImpactStyle.Light });
      if(this.patientHealth < 100) this.patientHealth += 10;
    } else {
      this.patientHealth -= 25;
      this.playSound('wrong'); // PLAY SOUND
      this.triggerShake();
      await Haptics.notification({ type: NotificationType.Warning });
    }

    const alert = await this.alertCtrl.create({
      header: choice.correct ? 'Excellent Choice!' : 'Dangerous Mistake!',
      message: choice.feedback, 
      buttons: ['Next Step'],
      backdropDismiss: false,
      cssClass: choice.correct ? 'alert-success' : 'alert-danger'
    });
    await alert.present();
    await alert.onDidDismiss();

    // Check Game Over
    if (this.patientHealth <= 0) {
      this.stopTimer();
      this.playSound('lose'); // GAME OVER SOUND
      this.showResults = true;
    } else {
      this.nextStep();
    }
  }

  async handleNutritionSort(selectedCategory: string) {
    const currentItem = this.activeGameData.items[this.currentStep];
    
    if (currentItem.category === selectedCategory) {
      this.score++;
      this.combo++;
      this.playSound('correct'); // PLAY SOUND
      await Haptics.impact({ style: ImpactStyle.Light });
    } else {
      this.combo = 0;
      this.gameTimer -= 5; 
      this.playSound('wrong'); // PLAY SOUND
      this.triggerShake();
      await Haptics.impact({ style: ImpactStyle.Heavy });
    }
    
    this.nextStep();
  }

  triggerShake() {
    this.isWrongAnimation = true;
    setTimeout(() => this.isWrongAnimation = false, 500);
  }

  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.gameTimer--;
      if (this.gameTimer <= 0) {
        this.stopTimer();
        this.playSound('lose'); // TIME IS UP SOUND
        this.showResults = true;
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  nextStep() {
    this.hasAnswered = false;
    let limit = 0;

    if (this.activeGame.id === 'trivia') limit = this.activeGameData.questions.length;
    if (this.activeGame.id === 'triage') limit = this.activeGameData.scenarios.length;
    if (this.activeGame.id === 'nutrition') limit = this.activeGameData.items.length;

    if (this.currentStep + 1 < limit) {
      this.currentStep++;
    } else {
      // Game Finished!
      this.showResults = true;
      this.stopTimer(); 
      
      // Play Win or Lose sound based on score
      if (this.activeGame.id === 'triage' && this.patientHealth <= 0) {
          this.playSound('lose');
      } else if (this.score / this.maxScore > 0.5) {
          this.playSound('win');
      } else {
          this.playSound('lose');
      }
    }
  }

  getPerformanceText() {
    const percentage = (this.score / this.maxScore) * 100;
    if (percentage === 100) return "PERFECT! You are a Health Master!";
    if (percentage >= 80) return "Amazing! You know your stuff.";
    if (percentage >= 50) return "Good job! Keep learning.";
    return "Don't give up! Review the health tips.";
  }
}