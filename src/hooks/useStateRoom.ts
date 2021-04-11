import { useState } from "react";
import states from "../utils/states";

const useStateRoom = (initialValue: string) => {
  const [state, setState] = useState(initialValue);
  const [color, setColor] = useState("success");

  const changeState = (newState?: string): void => {
    if (!newState) {
      switch (state) {
        case states.ocupado:
          setState(states.alistamiento);
          setColor("light");
          break;

        case states.reservado:
          setState(states.ocupado);
          setColor("danger");
          break;

        case states.alistamiento:
          setState(states.disponible);
          setColor("success");
          break;

        case states.mantenimiento:
          setState(states.disponible);
          setColor("success");
          break;
      }
    } else {
      // setState(newState);
      setState(states.ocupado);
      setColor("danger");
      if (newState === states.reservado) {
        setColor("warning");
      } else if (newState === states.mantenimiento) {
        setColor("medium");
      }
    }
  };

  const cancel = () => {
    if (state === states.ocupado || state === states.reservado) {
      setState(states.disponible);
    }
  };

  return {
    state,
    color,
    changeState,
    cancel,
  };
};

export default useStateRoom;
