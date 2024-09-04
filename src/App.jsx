import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])

  const saveToLs = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  const handleAdd = () => {
    const trimmedTodo = todo.trim();
    if (trimmedTodo) {
      const newTodo = {
        id: uuidv4(),
        todo: trimmedTodo,
        isCompleted: false,
        dateAdded: new Date().toLocaleString(),
        dateCompleted: null
      };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      setTodo("");
      saveToLs(newTodos);
    }
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLs(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLs(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    newTodos[index].dateCompleted = newTodos[index].isCompleted ? new Date().toLocaleString() : null;
    setTodos(newTodos);
    saveToLs(newTodos);
  }

  return (
    <div className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-full space-y-10'>
      
      <Navbar />

      <div className="container mx-auto bg-zinc-900 rounded-2xl px-4 pt-4 space-y-10 min-h-[89vh] w-full md:w-[75vw] lg:w-[50vw]">
        <div className="YourTodo space-y-5">
          <h1 className='flex text-white justify-center text-3xl font-bold border-b border-slate-700 p-5 mb-10'>
            Todoing - always manage your todos
          </h1>
          <h1 className='text-white text-xl font-bold'>Add a Todo</h1>

          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-28">
            <input 
              onChange={handleChange} 
              value={todo} 
              className='border border-gray-600 w-full md:w-[20vw] rounded-lg py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl' 
              type="text" 
              placeholder="Add your todo"
            />
            <button 
              onClick={handleAdd} 
              className='bg-gradient-to-r from-purple-300 to-pink-300 text-black font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
              <IoMdAddCircle />
            </button>
          </div>
        </div>

        <div className='border border-slate-700'></div>

        <h1 className='text-white text-xl font-bold'>Pending Tasks</h1>
        {todos.filter(todo => !todo.isCompleted).length === 0 && (
          <div className='flex justify-center text-white text-lg underline'>
            No Pending Tasks
          </div>
        )}

        {todos.filter(todo => !todo.isCompleted).map(item => {
          return (
            <div key={item.id} className='flex justify-center'>
              <div className='flex justify-between w-full md:w-2/3 text-center'>
                <div className='flex gap-4 md:gap-10'>
                  <input 
                    name={item.id} 
                    onChange={handleCheckBox} 
                    type="checkbox" 
                    checked={item.isCompleted} 
                  />
                  <div className="text-white text-xl">
                    {item.todo} 
                    <span className="text-sm text-gray-400 ml-2">(Added: {item.dateAdded})</span>
                  </div>
                </div>
                <div className="flex gap-2 md:gap-3">
                  <button 
                    onClick={(e) => handleEdit(e, item.id)} 
                    className='bg-gradient-to-r from-purple-300 to-pink-300 py-2 px-4 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
                    <FaEdit />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, item.id)} 
                    className='bg-gradient-to-r from-purple-300 to-pink-300 py-2 px-4 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <div className='border border-slate-700'></div>

        <h1 className='text-white text-xl font-bold'>Completed Tasks</h1>
        {todos.filter(todo => todo.isCompleted).length === 0 && (
          <div className='flex justify-center text-white text-lg underline'>
            No Completed Tasks
          </div>
        )}

        {todos.filter(todo => todo.isCompleted).map(item => {
          return (
            <div key={item.id} className='flex justify-center'>
              <div className='flex justify-between w-full md:w-2/3 text-center'>
                <div className='flex gap-4 md:gap-10'>
                  <input 
                    name={item.id} 
                    onChange={handleCheckBox} 
                    type="checkbox" 
                    checked={item.isCompleted} 
                  />
                  <div className="line-through text-white text-xl">
                    {item.todo} 
                    <span className="text-sm text-gray-400 ml-2">(Added: {item.dateAdded})</span>
                    {item.dateCompleted && (
                      <span className="text-sm text-gray-400 ml-2">(Completed: {item.dateCompleted})</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 md:gap-3">
                  <button 
                    onClick={(e) => handleEdit(e, item.id)} 
                    className='bg-gradient-to-r from-purple-300 to-pink-300 py-2 px-4 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
                    <FaEdit />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, item.id)} 
                    className='bg-gradient-to-r from-purple-300 to-pink-300 py-2 px-4 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default App