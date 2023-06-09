class View:
    def display_menu(self):
        print("\nGestión de inventario:")
        print("1. Agregar item")
        print("2. Editar item")
        print("3. Eliminar item")
        print("4. Buscar item")
        print("5. Salir")

    def get_input(self, message):
        return input(message)
