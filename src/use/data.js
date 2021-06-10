export default  async function() {
  const response = await fetch('https://my-json-server.typicode.com/FreeSoulll/fakeTemp/temperature');
  return await response.json();
}