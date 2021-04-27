// This code is not 100% mine, its based on streletss post on https://stackoverflow.com/questions/53451584/is-it-possible-to-share-states-between-components-using-the-usestate-hook-in-r

const makeObservable = <T>(target: T) => {
  let listeners: Function[] = [];
  let value = target;

  const get = () => value;

  const set = (newValue: T) => {
    if (value === newValue) return;
    value = newValue;
    listeners.forEach((l) => {
      l(value);
    });
  };

  const unsubscribe = (listenerFunc: Function) => {
    listeners = listeners.filter((l) => l !== listenerFunc);
  };

  const subscribe = (listenerFunc: Function) => {
    listeners.push(listenerFunc);
    return () => unsubscribe(listenerFunc); // will be used inside React.useEffect
  };

  return { get, set, subscribe };
};

export default makeObservable;
