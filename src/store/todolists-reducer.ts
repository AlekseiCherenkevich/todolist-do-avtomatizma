import {todolistId1, todolistId2} from "../utils/helpers"


export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
    sort: SortValuesType
}
type FilterValuesType = "all" | "completed" | "active"
type SortValuesType = 'default' | "A-z" | "Z-a"

const initialState: TodolistType[] = [
    {id: todolistId1, title: "What to learn", filter: "all", sort: "default"},
    {id: todolistId2, title: "What to buy", filter: "all", sort: "default"}
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(l => l.id !== action.payload.todolistId)
        case "ADD-NEW-TODOLIST":
            return [...state, {
                id: action.payload.todolistId,
                title: action.payload.todolistTitle,
                filter: "all",
                sort: "default"
            }]
        case "CHANGE-TODOLIST-TITLE":
            // return state.map(l => l.id === action.payload.todolistId ? {
            //     ...l,
            //     title: action.payload.todolistTitle
            // } : l)
            return state.map((l: TodolistType) => l.id === action.payload.todolistId ? {...l, title: action.payload.todolistTitle} : l)
        default:
            return state
    }
}

type ActionsType = RemoveTodolist | AddNewTodolistType | ChangeTodolistTitleType
type RemoveTodolist = ReturnType<typeof removeTodolistAC>
type AddNewTodolistType = ReturnType<typeof addNewTodolistAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitle>

const removeTodolistAC = (todolistId: string) => ({type: "REMOVE-TODOLIST", payload: {todolistId}} as const)
const addNewTodolistAC = (todolistId: string, todolistTitle: string) => (
    {type: "ADD-NEW-TODOLIST", payload: {todolistId, todolistTitle}} as const
)
const changeTodolistTitle = (todolistId: string, todolistTitle: string) => (
    {type: "CHANGE-TODOLIST-TITLE", payload: {todolistId, todolistTitle}} as const
)