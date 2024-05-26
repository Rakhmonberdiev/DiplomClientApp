import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  progressBarWidth: number = 100;
  timer: any;

  ngOnInit() {
    this.startProgressBar();
  }

  startProgressBar() {
    const totalTime = 1000; // Время в миллисекундах
    const interval = 10; // Интервал обновления прогресса (10 миллисекунд)

    const decrement = (interval / totalTime) * 100;
    this.timer = setInterval(() => {
      this.progressBarWidth -= decrement;
      if (this.progressBarWidth <= 0) {
        clearInterval(this.timer);
      }
    }, interval);
  }
}
