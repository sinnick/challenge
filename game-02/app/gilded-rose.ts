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
          this.passes_tick(this.items[i]);
          break;
        }
        case "Aged Brie": {
          this.cheese_tick(this.items[i]);
          break;
        }
        case "Sulfuras, Hand of Ragnaros": {
          this.sulfuras_tick(this.items[i]);
          break;
        }
        case this.items[i].name.toLowerCase().match("conjured")?.input: {
          this.conjured_tick(this.items[i]);
          break;
        }
        default: {
          this.normal_tick(this.items[i]);
          break;
        }
      } //end switch
    } //end for

    return this.items;
  } //end updateQuality

  normal_tick(item: { name: string; sellIn: number; quality: number }): void {
    if (item.quality >= 0 && item.quality < 50) {
      item.quality -= 1;
      item.sellIn -= 1;
      if (item.sellIn <= 0) {
        item.quality -= 1;
      }
    }
  }

  cheese_tick(item: { name: string; sellIn: number; quality: number }): void {
    if (item.quality < 50) {
      item.quality += 1;
      item.sellIn -= 1;
      if (item.sellIn <= 0) {
        item.quality += 1;
      }
    }
  }

  passes_tick(item: { name: string; sellIn: number; quality: number }): void {
    if (item.quality < 50) {
      item.quality += 1;
      item.sellIn -= 1;
      if (item.sellIn <= 10) {
        item.quality += 1;
      }
      if (item.sellIn <= 5) {
        item.quality += 1;
      }
      if (item.sellIn <= 0) {
        item.quality = 0;
      }
    }
  }

  sulfuras_tick(item: { name: string; sellIn: number; quality: number }): void {
    item.quality = 80;
    return;
  }

  conjured_tick(item: { name: string; sellIn: number; quality: number }): void {
    if (item.quality >= 0 && item.quality < 50) {
      item.quality -= 2;
      item.sellIn -= 1;
      if (item.sellIn <= 0) {
        item.quality -= 2;
      }
    }
  }
}
