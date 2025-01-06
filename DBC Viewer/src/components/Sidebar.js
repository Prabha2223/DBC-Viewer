export class Sidebar {
  constructor(container, onMessageSelect) {
    this.container = container;
    this.onMessageSelect = onMessageSelect;
    this.messages = [];
    this.selectedIndex = null;
  }

  setMessages(messages) {
    this.messages = Array.isArray(messages) ? [...messages] : [];
    this.selectedIndex = null;
    this.render();
  }

  selectMessage(message) {
    if (!message) return;
    
    const index = this.messages.findIndex(msg => msg.idDecimal === message.idDecimal);
    if (index !== -1) {
      this.selectedIndex = index;
      this.render();
    }
  }

  render() {
    const list = document.createElement('div');
    list.className = 'bg-gray-100 w-64 h-full overflow-y-auto';
    
    list.innerHTML = `
      <div class="p-2 font-bold border-b border-gray-300">Messages</div>
      ${this.messages.map((msg, index) => `
        <div class="p-2 hover:bg-blue-50 cursor-pointer ${this.selectedIndex === index ? 'bg-blue-100' : ''}" 
             data-index="${index}">
          ${msg.name} (${msg.idHex})
        </div>
      `).join('')}
    `;

    this.container.innerHTML = '';
    this.container.appendChild(list);

    list.querySelectorAll('div[data-index]').forEach(item => {
      item.addEventListener('click', () => {
        const index = parseInt(item.dataset.index);
        if (this.messages[index]) {
          this.selectedIndex = index;
          if (this.onMessageSelect) {
            this.onMessageSelect(this.messages[index]);
          }
          this.render();
        }
      });
    });
  }
}