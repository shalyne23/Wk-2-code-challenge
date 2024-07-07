document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const shoppingList = document.getElementById('shoppingList');
    const clearListButton = document.getElementById('clearListButton');

    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    const renderList = () => {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.classList.toggle('purchased', item.purchased);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editItem(index));

            const purchaseButton = document.createElement('button');
            purchaseButton.textContent = item.purchased ? 'Unmark' : 'Mark Purchased';
            purchaseButton.addEventListener('click', () => togglePurchased(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteItem(index));

            li.appendChild(editButton);
            li.appendChild(purchaseButton);
            li.appendChild(deleteButton);

            shoppingList.appendChild(li);
        });
    };

    const addItem = () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            saveAndRender();
        }
    };

    const editItem = (index) => {
        const newName = prompt('Edit item name:', items[index].name);
        if (newName) {
            items[index].name = newName.trim();
            saveAndRender();
        }
    };

    const togglePurchased = (index) => {
        items[index].purchased = !items[index].purchased;
        saveAndRender();
    };

    const deleteItem = (index) => {
        items.splice(index, 1);
        saveAndRender();
    };

    const clearList = () => {
        items = [];
        saveAndRender();
    };

    const saveAndRender = () => {
        localStorage.setItem('shoppingList', JSON.stringify(items));
        renderList();
    };

    addItemButton.addEventListener('click', addItem);
    clearListButton.addEventListener('click', clearList);

    renderList();
});