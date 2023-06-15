import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  completed: boolean;
}
export interface IToDoFormState {
  [key: string]: IToDo[];
}

export const todoListAtom = atom<IToDo[]>({
  key: "toDos",
  default: [],
});
export const todoProgressSelector = selector({
  key: "completeProgress",
  get: ({ get }) => {
    const todos = get(todoListAtom);
    const completeCount = todos.filter((todo) => todo.completed).length;
    return `${completeCount} out of ${todos.length} Todos Complete`;
  },
});

// export const todoRelatItemAtIndex = selector({
//   key: "todoRelatItemAtIndex",
//   get: ({ get }) => {
//     const todos = get(todoListAtom);
//     const index = todos.findIndex((todo)=>todo.id === todoListAtom.toJSON("id"))
//     const replatItem = [...todos.slice(0, index)]
//     return todos;
//   },

// });
