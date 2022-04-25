import React, { useState } from "react";
import styles from "./React.module.css";
import "./index.css";
import Navbar from "../../../components/basic/Navbar";
import Card from "../../../components/basic/Card";

function BasicReact() {
  const data = [
    { id: 1, name: "Spiderman" },
    { id: 2, name: "Batman" },
    { id: 3, name: "Lego" }
  ];
  const [email, setEmail] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showDate, setShowDate] = useState(false);

  const handleClick = (num, string) => {
    alert("Button clicked!");
    console.log(num, string);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
  };

  const handleReset = (event) => {
    event.preventDefault();
    console.log("reset");
  };

  const handleChangeEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };
  const handleSearch = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      console.log("User press enter");
      console.log("Keyword: ", event.target.value);
      setKeyword(event.target.value);
    }
  };

  const handleDetailMovie = (id) => {
    console.log("Detail clicked", id);
  };

  return (
    <div className="text-center">
      <h1>Basic React Page</h1>
      <hr />
      <h3>Components</h3>
      <Navbar />
      <hr />
      <h3>Card</h3>
      <Card name="Spiderman" category="Action, Adventure" handleDetail={handleDetailMovie} />
      <hr />
      <h3>Mapping</h3>
      {data.map((item) => (
        <div key={item.id}>
          <button>{item.name}</button>
        </div>
      ))}
      <hr />
      <h3>Event</h3>
      <h5>Button</h5>
      {/* onClick */}
      <button onClick={handleClick}>Click me!</button>
      <button onClick={() => handleClick(1, "haha")}>Click me!</button>
      {/* onSubmit */}
      {/* onReset */}
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <button onClick={handleClick}>Click me!</button>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
      <h5>Input</h5>
      {/* onChange */}
      <input
        type="email"
        placeholder="Input your email"
        onChange={handleChangeEmail}
        // Bisa juga tanpa membuat functionn terpisah
        // onChange={(event) => setEmail(event.target.value)}
      />
      <h6>Your email is {email}</h6>
      {/* onKeyPress */}
      <input type="text" placeholder="Search..." onKeyPress={handleSearch} />
      <h6>Keyword: {keyword}</h6>
      <hr />
      <h3>Conditional Rendering</h3>
      <h5>Short Logic</h5>
      <button onClick={() => setShowDate(!showDate)}>Show Date</button>
      {showDate && <h1>{new Date().toLocaleDateString()}</h1>}
      <h5>Ternary Operator</h5>
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.id}>
            <button>{item.name}</button>
          </div>
        ))
      ) : (
        <h6>Data not found</h6>
      )}
      <hr />
      <h3>Styles in React</h3>
      {/* react module */}
      <h1 className={`${styles.heading} ${styles.textUnderline} text-center`}>Hello World</h1>
      <h1 className={(styles.heading, styles.textUnderline)}>Hello World</h1>
      <h1 className={styles.heading2}>Hello World</h1>
    </div>
  );
}

export default BasicReact;
