import randomColor from "randomcolor";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { v4 } from "uuid";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const newItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: v4(),
        item: item,
        color: randomColor({
          luminosity: "light",
        }),
        defaultPosition: {
          x: 500,
          y: -500,
        },
      };
      setItems((item) => [...items, newItem]);
      setItem("");
    } else {
      alert("Enter something >:(");
      setItem("");
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  const updatePosition = (data, index) =>{
    let newArray = [...items]
    newArray[index].defaultPosition = {
      x: data.x,
      y: data.y,
    }
    setItems(newArray)
  };

  const keyPress = (e) =>{
      const code = e.keyCode || e.which 
      if (code === 13){
        newItem()
      }
  }
  return (
    <div className="App">
      <div className="wrapper">
        <input
          value={item}
          className="input"
          type="text"
          placeholder="input your important tasks"
          onChange={(e) => setItem(e.target.value)}
          onKeyPress={(e) => keyPress(e)}
        />
        <button className="enter" onClick={newItem}>
          Enter
        </button>
      </div>
      {items.map((item, index) => {
        return (
          <Draggable
            onStop={(_, data) => {
              updatePosition(data, index);
            }}
            key={index}
            defaultPosition={item.defaultPosition}
          >
            <div className="item" style={{ backgroundColor: `${item.color}` }}>
              {`${item.item}`}
              <button className="delete" onClick={() => deleteItem(item.id)}>
                x
              </button>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export default App;
