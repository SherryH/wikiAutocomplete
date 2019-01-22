const jsonp = jest.fn((url, callback) => {
  console.log('jsonp called');
  const jsonpData = ['London', 'London Underground', 'London School of Economics'];
  callback(null, jsonpData);
});

export default jsonp;
