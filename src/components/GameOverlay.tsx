export default function GameOverlay(){
 
return (
  <div className="gameOverlay">
    <img src="" alt="" />
    <h2>Name</h2>
    <select value={selectedValue}>
      <option value="Normal"></option>
      <option value="Nuzlocke"></option>
      <option value="Hardcore Nuzlocke"></option>
    </select>
    <p>Status: {}</p>
    <p>Best Time: {}</p>
    <p>Total Play Time: {}</p>
    <p>{/*Only show "Result: " if nuzlocke option selected*/}</p>
    <button onClick={/*use function passed as prop by parent*/}>
      <img src=""  />
    </button>
  </div>
);
}
