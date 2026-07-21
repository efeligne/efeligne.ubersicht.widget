const dispatcher = (type, dispatch) => (output) => dispatch({ type, data: (output ?? '').trim() });

export default dispatcher;
