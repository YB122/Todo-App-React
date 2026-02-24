import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
    formState: { errors: errorsAdd, touchedFields: touchedAdd },
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
    formState: { errors: errorsEdit, touchedFields: touchedEdit },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
  function getPosts() {
    // const token = localStorage.getItem("userToken");
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
        getPosts();
        resetAdd();
      })
      .catch((err) => {
        console.log(err);
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
        getPosts();
      })
      .catch((err) => {
        console.log(err);
      });
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
        getPosts();
        resetEdit();
        setisOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {/* modal start */}
      {isOpen && (
        <>
          <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? "flex" : "hidden"}`}
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                  <h3 className="text-lg font-medium text-heading">
                    Edit Task
                  </h3>

                  <button
                    type="button"
                    onClick={() => {
                      setisOpen(false);
                      resetEdit();
                      setCurrentTodo(null);
                    }}
                    className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                {/* Body */}
                <form
                  className="pt-4 md:pt-6"
                  onSubmit={handleSubmitEdit(editTask)}
                >
                  <div className="mb-5">
                    <label
                      htmlFor="text"
                      className="block mb-2.5 text-sm font-medium text-heading capitalize"
                    >
                      title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                      placeholder="What needs to be done?"
                      {...registerEdit("title")}
                      // value={currentTodo.title}
                    />
                    {errorsEdit.title && touchedEdit.title && (
                      <p className="text-red-500 text-sm">
                        {errorsEdit.title.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="message"
                      className="block mb-2.5 text-sm font-medium text-heading capitalize"
                    >
                      description
                    </label>

                    <textarea
                      id="message"
                      rows={2}
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                      placeholder="Add some details..."
                      {...registerEdit("description")}
                      // value={currentTodo.description}
                    ></textarea>
                    {errorsEdit.description && touchedEdit.description && (
                      <p className="text-red-500 text-sm">
                        {errorsEdit.description.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="text-white w-full bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none transition-colors"
                  >
                    Edit Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      {/* modal end */}
      <form
        onSubmit={handleSubmitAdd(addTodo)}
        className="max-w-sm mx-auto border-1 m-5 p-5 rounded-base bg-neutral-primary-medium dark:bg-neutral-secondary-medium"
      >
        <h2 className="text-xl font-bold mb-4 text-heading border-b pb-2">
          Add New Task
        </h2>
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2.5 text-sm font-medium text-heading capitalize"
          >
            title
          </label>
          <input
            type="text"
            id="title"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="What needs to be done?"
            {...registerAdd("title")}
          />
          {errorsAdd.title && touchedAdd.title && (
            <p className="text-red-500 text-sm">{errorsAdd.title.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="message"
            className="block mb-2.5 text-sm font-medium text-heading capitalize"
          >
            description
          </label>

          <textarea
            id="message"
            rows={2}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
            placeholder="Add some details..."
            {...registerAdd("description")}
          ></textarea>
          {errorsAdd.description && touchedAdd.description && (
            <p className="text-red-500 text-sm">
              {errorsAdd.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="text-white w-full bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none transition-colors"
        >
          Add Task
        </button>
      </form>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white dark:bg-neutral-secondary-medium border border-default-light dark:border-default-medium rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-heading mb-2 line-clamp-1">
                  {todo.title}
                </h3>
                <p className="text-body text-sm mb-4 line-clamp-3 min-h-[4.5rem]">
                  {todo.description}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-default-light dark:border-default-medium">
                <button
                  onClick={() => {
                    ediitTodo(todo);
                  }}
                  data-modal-target="authentication-modal"
                  data-modal-toggle="authentication-modal"
                  className="flex-1 px-4 py-2 text-sm font-medium text-brand border border-brand rounded-lg hover:bg-brand hover:text-white transition-all duration-200 focus:ring-2 focus:ring-brand focus:ring-offset-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    deleteTodo(todo._id);
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-body text-lg italic">
              No tasks found. Add your first task above!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
