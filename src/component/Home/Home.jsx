import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

export default function Home() {
  const [isOpen, setisOpen] = useState(false);
  let [todos, setTodos] = useState([]);
  let [currentTodo, setCurrentTodo] = useState({});
  const schema = z.object({
    title: z
      .string()
      .min(3, "The Title Must Be Greater Than 3 Character")
      .max(30, "The Title Must Be smaller Than 30 Character"),
    description: z
      .string()
      .min(3, "The Description Must Be Greater Than 3 Character")
      .max(300, "The Description Must Be smaller Than 300 Character"),
  });

  // ADD FORM
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  // EDIT FORM
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
  function getPosts() {
    axios
      .get("https://todo-nti.vercel.app/todo/get-all", {
        headers: {
          token: `${localStorage.getItem("userToken")}`,
        },
      })
      .then((data) => {
        console.log(data.data.todos);
        setTodos(data.data.todos);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  useEffect(() => {
    getPosts();
  }, []);

  function addTodo(data) {
    console.log(data);

    axios
      .post("https://todo-nti.vercel.app/todo/create", data, {
        headers: {
          token: `${localStorage.getItem("userToken")}`,
        },
      })
      .then(() => {
        toast.success("Task added successfully!");
        getPosts();
        resetAdd();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add task.");
      });
  }
  function deleteTodo(id) {
    axios
      .delete(`https://todo-nti.vercel.app/todo/delete-todo/${id}`, {
        headers: {
          token: `${localStorage.getItem("userToken")}`,
        },
      })
      .then(() => {
        toast.success("Task deleted successfully!");
        getPosts();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete task.");
      });
  }

  function confirmDelete(id) {
    toast.custom(
      (t) => (
        <div
          className={`${t.visible ? "animate-fade-in" : "opacity-0"} max-w-md w-full bg-white dark:bg-slate-900 shadow-2xl rounded-3xl pointer-events-auto flex flex-col p-6 border border-slate-100 dark:border-slate-800 ring-1 ring-black ring-opacity-5 transition-all duration-300`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                Delete Task?
              </p>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-1">
              Are you sure you want to remove this task? This action cannot be
              undone and the text content will be lost.
            </p>
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="px-6 py-2.5 text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full hover:opacity-80 transition-all border border-transparent dark:border-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteTodo(id);
                  toast.dismiss(t.id);
                }}
                className="px-6 py-2.5 text-sm font-bold text-white bg-red-500 rounded-full hover:bg-red-600 shadow-lg shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
      },
    );
  }
  function ediitTodo(todo) {
    console.log("edit");

    setisOpen(true);
    setCurrentTodo(todo);
    console.log(todo);
    resetEdit({
      title: todo.title,
      description: todo.description,
    });
  }

  function editTask(data) {
    console.log("editing task:", data);

    axios
      .patch(
        `https://todo-nti.vercel.app/todo/update-todo/${currentTodo._id}`,
        data,
        {
          headers: {
            token: `${localStorage.getItem("userToken")}`,
          },
        },
      )
      .then(() => {
        toast.success("Task updated successfully!");
        getPosts();
        resetEdit();
        setisOpen(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update task.");
      });
  }

  return (
    <div className="pt-24 pb-12 min-h-screen animate-fade-in transition-colors duration-500">
      {/* modal start */}
      {isOpen && (
        <div
          id="authentication-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
        >
          <div className="relative w-full max-w-md animate-fade-in">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none transition-all duration-300 overflow-hidden w-full max-w-lg mx-auto p-6 md:p-8">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Edit Task
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setisOpen(false);
                    resetEdit();
                    setCurrentTodo(null);
                  }}
                  className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl p-2 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmitEdit(editTask)} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2 ml-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all outline-none font-medium px-6 w-full py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="Task title"
                    {...registerEdit("title")}
                  />
                  {errorsEdit.title && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {errorsEdit.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2 ml-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="bg-slate-50 border border-slate-200 rounded-3xl text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all outline-none font-medium px-6 w-full py-3 resize-none dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="Task details"
                    {...registerEdit("description")}
                  />
                  {errorsEdit.description && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                      {errorsEdit.description.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setisOpen(false);
                      resetEdit();
                    }}
                    className="flex-1 py-3 font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full hover:opacity-80 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-2 bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all dark:bg-blue-600 dark:hover:bg-blue-700 dark:shadow-blue-900/20"
                  >
                    Update Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none transition-all duration-300 p-6 md:p-10 mb-12 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Create New Task
            </h2>
          </div>

          <form
            onSubmit={handleSubmitAdd(addTodo)}
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-start"
          >
            <div className="space-y-1">
              <input
                type="text"
                className="bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all outline-none font-medium px-6 w-full py-3.5 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500"
                placeholder="Title"
                {...registerAdd("title")}
              />
              {errorsAdd.title && (
                <p className="text-red-500 text-xs ml-1 font-medium">
                  {errorsAdd.title.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <textarea
                rows={1}
                className="bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all outline-none font-medium px-6 w-full py-3.5 min-h-[50px] resize-none dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500"
                placeholder="Description"
                {...registerAdd("description")}
              />
              {errorsAdd.description && (
                <p className="text-red-500 text-xs ml-1 font-medium">
                  {errorsAdd.description.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all h-[54px] px-10 flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:shadow-blue-900/20"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Task
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {todos.map((todo, index) => (
            <div
              key={todo._id}
              className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none transition-all duration-300 p-6 flex items-center justify-between group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex-1 min-w-0 pr-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 whitespace-normal break-words group-hover:text-blue-500 transition-colors">
                  {todo.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-normal break-words">
                  {todo.description}
                </p>
              </div>

              <div className="flex items-center gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => ediitTodo(todo)}
                  className="w-11 h-11 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                  title="Edit task"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => confirmDelete(todo._id)}
                  className="w-11 h-11 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  title="Delete task"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {todos.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400 opacity-50">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <p className="text-slate-900 dark:text-white text-xl font-bold mb-2">
                Ready to be productive?
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Your task list is empty. Add something above!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
