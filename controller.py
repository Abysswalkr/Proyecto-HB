from model import Model
from view import View

class Controller:
    def __init__(self):
        self.model = Model()
        self.view = View()

    def run(self):
        while True:
            self.view.display_menu()
            choice = self.view.get_input("Selecciona una opción: ")

            if choice == "1":
                item = self.view.get_input("Ingresa el item a agregar: ")
                self.model.add_item(item)
                print(f"Item '{item}' agregado correctamente.")

            elif choice == "2":
                old_item = self.view.get_input("Ingresa el item que deseas editar: ")
                if self.model.search_item(old_item):
                    new_item = self.view.get_input("Ingresa el nuevo valor del item: ")
                    self.model.edit_item(old_item, new_item)
                    print(f"Item '{old_item}' editado correctamente.")
                else:
                    print("El item indicado no existe.")

            elif choice == "3":
                item = self.view.get_input("Ingresa el item que deseas eliminar: ")
                if self.model.search_item(item):
                    self.model.remove_item(item)
                    print(f"Item '{item}' eliminado correctamente.")
                else:
                    print("El item indicado no existe.")

            elif choice == "4":
                item = self.view.get_input("Ingresa el item que deseas buscar: ")
                if self.model.search_item(item):
                    print(f"El item '{item}' fue encontrado.")
                else:
                    print("El item indicado no existe.")

            elif choice == "5":
                print("Saliendo del programa...")
                break

            else:
                print("Opción no válida. Por favor, ingresa un número del 1 al 5.")
