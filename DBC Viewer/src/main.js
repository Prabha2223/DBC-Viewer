import { initializeApp } from './app/initialize';
import { AppState } from './app/state';
import { AppHandlers } from './app/handlers';
import './style.css';

class App {
  constructor() {
    this.state = new AppState();
    this.handlers = new AppHandlers(this.state);
    initializeApp(this.state, this.handlers);
  }
}

// Initialize the application
new App();