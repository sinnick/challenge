export class Item {
    name: string;
    sellIn: number;
    quality: number;
  
    constructor(name, sellIn, quality) {
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    }
  }
  
  export class Normal extends Item {
    constructor(name: string, sellIn: number, quality: number) {
      super(name, sellIn, quality);
    }
  
    tick() {
      if (this.quality >= 0 && this.quality < 50) {
        this.quality -= 1;
        this.sellIn -= 1;
        if (this.sellIn <= 0) {
          this.quality -= 1;
        }
      }
    }
  }
  
  export class AgedBrie extends Item {
    constructor(name: string, sellIn: number, quality: number) {
      super(name, sellIn, quality);
    }
  
    tick() {
      if (this.quality < 50) {
        this.quality += 1;
        this.sellIn -= 1;
        if (this.sellIn <= 0) {
          this.quality += 1;
        }
      }
    }
  }
  
  export class Sulfuras extends Item {
    constructor(name: string, sellIn: number, quality: number) {
      super(name, sellIn, quality);
    }
  
    tick() {
      // nothing
    }
  }
  
  export class Tickets extends Item {
    constructor(name: string, sellIn: number, quality: number) {
      super(name, sellIn, quality);
    }
  
    tick() {
      if (this.quality < 50) {
        this.quality += 1;
        this.sellIn -= 1;
        if (this.sellIn <= 10) {
          this.quality += 1;
        }
        if (this.sellIn <= 5) {
          this.quality += 1;
        }
        if (this.sellIn <= 0) {
          this.quality = 0;
        }
      }
    }
  }
  
  export class Conjured extends Item {
    constructor(name: string, sellIn: number, quality: number) {
      super(name, sellIn, quality);
    }
  
    tick() {
      if (this.quality >= 0 && this.quality < 50) {
        this.quality -= 2;
        this.sellIn -= 1;
        if (this.sellIn <= 0) {
          this.quality -= 2;
        }
      }
    }
  }
  
  export class GildedRose {
    items: Array<Item>;
  
    constructor(items = [] as Array<Item>) {
      this.items = items;
    }
  
    updateQuality() {
      for (let i = 0; i < this.items.length; i++) {
        //for each item in the array, call the appropriate tick function, could have been done with a hashmap, but this is more readable and also needed to be able to match the substring for conjured items
  
        switch (this.items[i].name) {
          case "Backstage passes to a TAFKAL80ETC concert": {
            const tickets = new Tickets(this.items[i].name,this.items[i].sellIn,this.items[i].quality);
            tickets.tick();
            break;
          }
          case "Aged Brie": {
            const cheese = new AgedBrie(this.items[i].name,this.items[i].sellIn,this.items[i].quality);
            cheese.tick();
            break;
          }
          case "Sulfuras, Hand of Ragnaros": {
            const sulfuras = new Sulfuras(this.items[i].name,this.items[i].sellIn,this.items[i].quality);
            sulfuras.tick();
            break;
          }
          case "Conjured Mana Cake": {
              const conjured = new Conjured(this.items[i].name,this.items[i].sellIn,this.items[i].quality);
              conjured.tick();
              break;
          }
          default: {
            const normal = new Normal(this.items[i].name,this.items[i].sellIn,this.items[i].quality);
            normal.tick();
          }
        } //end switch
      } //end for
  
      return this.items;
    } //end updateQuality
  
    addItem(item) {
      this.items.push(item);
    }
  }
  