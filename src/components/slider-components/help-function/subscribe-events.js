const subscribeEvents = (target, eventName, handler) => {
  target.addEventListener(eventName, handler);
  return () => target.removeEventListener(eventName, handler);
};

export default subscribeEvents;
