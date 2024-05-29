import { createContext, useContext } from "react";

type DappContent = {
    styleId: number,
    setStyleId: (styleId: number) => void,
    shapeId: number,
    setShapeId: (shapeId: number) => void,
    sizeOption: string,
    setSizeOption: (sizeOption: string) => void,
    styleText: string,
    setStyleText: (styleText: string) => void,
    prediction: Object,
    setPrediction: (prediction: Object) => void,
    isBuy: boolean,
    setIsBuy: (isBuy: boolean) => void,
    status: string,
    setStatus: (status: string) => void,
}

export const DappContext = createContext<DappContent>({
    styleId: 0,
    setStyleId: () => { },
    shapeId: 0,
    setShapeId: () => { },
    sizeOption: "",
    setSizeOption: () => { },
    styleText: "",
    setStyleText: () => { },
    prediction: {},
    setPrediction: () => { },
    isBuy: false,
    setIsBuy: () => { },
    status: "",
    setStatus: () => { },
});

export const useDappContext = () => useContext(DappContext);