import { NativeModules } from "react-native";
const { NativeEngine } = NativeModules;
export const Somar = (a: number, b: number): Promise<number> => {
    return NativeEngine.Somar(a, b);
}

//3243749670387