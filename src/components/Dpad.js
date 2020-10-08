import React, { useEffect, useState } from "react";

const Dpad = () => {
  const [data, setData] = useState([]);
  //   document.querySelectorAll(".items")[0] &&
  //   document.querySelectorAll(".items")[0].focus();
  //   document.querySelector('[tabindex="1"]').focus();

  // console.log("dcc ", document.querySelectorAll(".items")[0]);

  function nav(move) {
    const currentIndex = document.activeElement.tabIndex;
    console.log("active element", document.activeElement);
    const next = currentIndex + move;
    const items = document.querySelectorAll(".items");
    // console.log("items", items);
    console.log("currentIndex", currentIndex);
    // console.log("next", next);
    if (items[next]) {
      const targetElement = items[next];
      targetElement.focus();
      // console.log("targetElement", targetElement);
    }
  }

  // useEffect(() => {
  //   var list = document.querySelector('.wrapper');
  //   var items = data.length > 0 && list.querySelectorAll('.items');
  //   for (var i = 0; i < items.length; i++) {
  //     items[i].index = i;
  //   }
  //   console.log( items[i].count)
  //   var amount = data.length > 0 && Math.floor(
  //     list.offsetWidth /
  //     list.firstElementChild.offsetWidth
  //   );
  //   var codes = {
  //     38: -amount,
  //     40: amount,
  //     39: 1,
  //     37: -1
  //   };

  //   function handlekeys(ev) {
  //     var keycode = ev.keyCode;
  //     if (codes[keycode]) {
  //       var t = ev.target;
  //       if (t.index !== undefined) {
  //         if (items[t.index + codes[keycode]]) {
  //           console.log(items[t.index + codes[keycode]])
  //           items[t.index + codes[keycode]].focus();
  //         }
  //       }
  //     }
  //   }
  //   list.addEventListener('keyup', handlekeys);
  //   console.log('ddd')
  // }, [data])

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= 50; i++) {
      arr.push(i);
    }
    setData(arr);
    var list = document.querySelector(".wrapper");
    list.addEventListener("keydown", handleKeydown);
  }, []);

  function handleKeydown(e) {
    console.log(e.keyCode);
    switch (e.key) {
      case "ArrowUp":
        nav(-1);
        break;
      case "ArrowDown":
        nav(1);
        break;
      case "ArrowRight":
        nav(1);
        break;
      case "ArrowLeft":
        nav(-1);
        break;
    }
  }

  return (
    <div className="wrapper">
      {data.map((data, index) => (
        <div className="items" key={index} tabIndex={index}>
          {data}
        </div>
      ))}
    </div>
  );
};

export default Dpad;
