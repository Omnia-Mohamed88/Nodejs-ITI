const fs = require('fs');
const path = require('path');

const todoFilePath = path.join(__dirname, 'todos.json');

function main() {
    const [, , command, ...args] = process.argv;

    var todoList = JSON.parse(fs.readFileSync(todoFilePath));

    switch (command) {
        case 'add':
            const entryText = args[0];
            if (entryText) {
                addTodoEntry(entryText, todoList);
            } else {
                console.log('Please provide a valid entry text.');
            }
            break;
        case 'list':
            displayTodoList(todoList);
            break;
        case 'edit':
            const editId = args[0];
            const editedText = args[1];
            if (editId && editedText) {
                editTodoEntry(editId, editedText, todoList);
            } else {
                console.log('Please provide both id and new text for editing.');
            }
            break;
        case 'delete':
            const deleteId = args[0];
            if (deleteId) {
                todoList = deleteTodoEntry(deleteId, todoList);
                displayTodoList(todoList);
            } else {
                console.log('Please provide the id for deletion.');
            }
            break;
        default:
            console.log('Invalid command. Available commands: add, list, edit, delete');
            break;
    }
}

function displayTodoList(todoList) {
    console.log('\nTodo List:');
    const formattedEntries = todoList.map(entry => `${entry.id}: ${entry.text}\n`);
    console.log(formattedEntries.join(''));
}


function addTodoEntry(entryText, todoList) {
    const trimmedEntryText = entryText.trim();

    if (trimmedEntryText) {
        let lastId = 0;
        if (todoList.length) {
            lastId = todoList[todoList.length - 1].id;
        }

        const newEntry = {
            id: lastId + 1,
            text: trimmedEntryText,
        };

        todoList = todoList.concat([newEntry]);

        fs.writeFileSync(todoFilePath, JSON.stringify(todoList, null, 1));

        console.log(`Added: ${trimmedEntryText}`);
        displayTodoList(todoList);
    } else {
        console.log('Please provide a valid entry text.');
    }
}


function editTodoEntry(id, newText, todoList) {
    const entryIndex = todoList.findIndex(entry => entry.id === Number(id));

    if (entryIndex !== -1) {
        todoList[entryIndex].text = newText;
        fs.writeFileSync(todoFilePath, JSON.stringify(todoList, null, 1));
        console.log(`Edited entry with id ${id} to be "${newText}"`);
        displayTodoList(todoList);
    } else {
        console.log(`Entry with id ${id} not found.`);
    }
}
function deleteTodoEntry(id, todoList) {
    const updatedTodoList = todoList.filter(entry => entry.id !== Number(id));

    if (updatedTodoList.length !== todoList.length) {
        fs.writeFileSync(todoFilePath, JSON.stringify(updatedTodoList, null, 2), 'utf8');
        console.log(`Deleted entry with id ${id}`);
    } else {
        console.log(`Entry with id ${id} not found.`);
    }

    return updatedTodoList;
}


main();
























