class Model:
    def __init__(self):
        self.items = []

    def add_item(self, item):
        self.items.append(item)

    def edit_item(self, old_item, new_item):
        if old_item in self.items:
            item_index = self.items.index(old_item)
            self.items[item_index] = new_item

    def remove_item(self, item):
        if item in self.items:
            self.items.remove(item)

    def search_item(self, item):
        return item in self.items
