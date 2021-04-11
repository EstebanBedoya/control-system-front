
let timeoutId: any;
export default function debounce(func: any, time: number) {
    
    return (...args: any) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        // debugger;
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, time);
    };
  };