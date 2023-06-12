import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
export const todosState = atom<string[]>({
  key: "todosState",
  default: ["a", "b", "c", "d", "e", "f", "g"],
  effects_UNSTABLE: [persistAtom],
});
export const isDartState = atom({
  key: "isDarkState",
  default: true,
  effects_UNSTABLE: [persistAtom],
});

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: any, _: any, isRest: boolean) => {
      isRest
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
export enum Keys {
  GO_WANT = "GO_WANT",
  HAVE_BEEN = "HAVE_BEEN",
  FAVS = "FAVS",
}
export interface ICountry {
  id: number;
  contents: string;
}

export const wannaGoState = atom<ICountry[]>({
  key: Keys.GO_WANT,
  default: [],
  effects: [localStorageEffect(Keys.GO_WANT)],
});
export const haveBeenState = atom<ICountry[]>({
  key: Keys.HAVE_BEEN,
  default: [],
  effects: [localStorageEffect(Keys.HAVE_BEEN)],
});
export const favsState = atom<ICountry[]>({
  key: Keys.FAVS,
  default: [],
  effects: [localStorageEffect(Keys.FAVS)],
});
