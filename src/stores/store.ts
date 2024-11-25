import { atom } from "nanostores";

interface User{
  userPhoto:string;
  userName:string;
  userEmail:string;
}

export const fecha = atom<Date>(new Date())
export const userData = atom<User>({userPhoto:'',userName:'',userEmail:''})
export const openReminderForm = atom<boolean>(false)
export const currentDateState = atom<Date>(new Date())
export const currentMonthState = atom<number>(currentDateState.get().getMonth())
export const bigReminder = atom<boolean>(false)