class Item {
   constructor(name, quantity) {
      this.name = name;
      this.quantity = quantity;
   }

   describe() {
      return `${this.name} order ${this.quantity}`;
   }
}

class Order {
   constructor(name) {
      this.name = name;
      this.items = [];
   }

   addItem(item) {
      if (item instanceof Item) {
         this.items.push(item);
      } else {
         throw new Error(`You can only add an instance of Item. 
         argument is not a player: ${item}`);
      }
   }
   describe() {
      return `${this.name} has ${this.items.length} items.`;
   }
}

class Menu {
   constructor() {
      this.orders = [];
      this.selectedOrder = null;
   }
   start() {
      let selection = this.showMainMenuOptions();

      while (selection != 0) {
         switch (selection) {

            case '1':
               this.createOrder();
               break;
            case '2':
               this.viewOrder();
               break;
            case '3':
               this.deleteOrder();
               break;
            case '4':
               this.displayOrders();
               break;
            default:
               selection = 0;
         }
         selection = this.showMainMenuOptions();
      }

      alert('Goodbye!');
   }

   showMainMenuOptions() {
      return prompt(`
         0) exit
         1) create new order
         2) view order        
         3) delete order  
         4) display orders
      `);
   }

   showItemMenuOptions(itemInfo) {
      return prompt(`
         0) back
         1) create item
         2) delete item         
         -----------------
         ${itemInfo}
      `);
   }

   displayOrders() {
      let orderString = '';
      for (let i = 0; i < this.orders.length; i++) {
         orderString += i = ') ' + this.orders[i].name + '\n';
      }
      alert(orderString);
   }

   createOrder() {
      let name = prompt('Enter name for new order:');
      this.orders.push(new Order(name));
   }

   viewOrder() {
      let index = prompt('Enter the index of the order you want to view (start with 0):');
      if (index > -1 && index < this.orders.length) {
         this.selectedOrder = this.orders[index];
         let description = 'Item name:' + this.selectedOrder.name + '\n';
         for (let i = 0; i < this.selectedOrder.items.length; i++) {
            description += i + ') ' + this.selectedOrder.items[i].name
               + ' - ' + this.selectedOrder.items[i].quantity + '\n';
         }
         let selection1 = this.showItemMenuOptions(description);
         switch (selection1) {
            case '1':
               this.createItem();
               break;
            case '2':
               this.deleteItem();
         }
      }
   }

   deleteOrder() {
      let index = prompt('Enter the index of the order that you wish to delete: ');
      if (index > -1 && index < this.orders.length) {
         this.orders.splice(index, 1);
      }
   }

   createItem() {
      let name = prompt('Enter name for new item:');
      let quantity = prompt('Enter quantity for new item:');
      this.selectedOrder.items.push(new Item(name, quantity));
   }

   deleteItem() {
      let index = prompt('Enter the index of the item you wish to delete:');
      if (index > -1 && index < this.selectedOrder.items.length) {
         this.selectedOrder.items.splice(index, 1);
      }
   }
}


let menu = new Menu();
menu.start()

