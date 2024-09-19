import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showAddFriend, setShowAddFriend] = useState(false);

  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  };

  const handleSelect = (val) => {
    // const found = friends.find((friend) => friend.id === id);
    // return found;
    setSelectedFriend((cur) => (cur?.id === val.id ? null : val));
    console.log(selectedFriend);
  };

  const handleShowAddFriend = () => {
    setShowAddFriend(!showAddFriend);
  };

  const handleSplitBill = (val) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + val }
          : friend
      )
    );
    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelect={handleSelect}
        />
        {showAddFriend ? (
          <FormAddFriend handleAddFriend={handleAddFriend} />
        ) : (
          ""
        )}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {/* <Button onClick={handleShowAddFriend}>Add</Button> */}
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend?.id}
        />
      )}
    </div>
  );
}

const FormAddFriend = ({ handleAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const submitFriend = (e) => {
    e.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name: name,
      image: `${image}?u=${id}`,
      balance: 0,
      id,
    };

    handleAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  // const newFriend = {
  //   name: name,
  //   image: `${image}?u=${id}`,
  //   balance: 0,
  //   id
  // }

  return (
    <div>
      <form className="form-add-friend" onSubmit={submitFriend}>
        <label>👬 Friend Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>🌆 Image Url</label>
        <input
          type="text"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <Button>Add</Button>
      </form>
    </div>
  );
};
// function FormAddFriend({ handleAddFriend }) {
//   const submitFriend = (e) => {
//     e.preventDefault();

//     if (!name || !image) return;

//     const id = crypto.randomUUID();

//     const newFriend = {
//       name: name,
//       image: `${image}?u=${id}`,
//       balance: 0,
//       id,
//     };
//     handleAddFriend(newFriend);

//     console.log(newFriend);
//     setName("");
//     setImage("https://i.pravatar.cc/48");
//   };

//   const [name, setName] = useState("");
//   const [image, setImage] = useState("https://i.pravatar.cc/48");

//   return (
//     <form className="form-add-friend" onSubmit={submitFriend}>
//       <label>👬 Friend Name</label>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <label>🌆 Image Url</label>
//       <input
//         type="text"
//         value={image}
//         onChange={(e) => setImage(e.target.value)}
//       />
//       <Button>Add</Button>
//     </form>
//   );
// }

function FriendList({ friends, selectedFriend, onSelect }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          selectedFriend={selectedFriend}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onSelect }) {
  const isSelect = selectedFriend?.id === friend.id;
  return (
    <li className={isSelect ? "selected" : ""}>
      <img src={friend.image} alt="profile" />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p>
          {friend.name} owes you {friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelect(friend)}>Select</Button>
    </li>
  );
}

// function FormSplitBill({ selectedFriend, onSplitBill }) {
//   const [bill, setBill] = useState("");
//   const [userExpense, setUserExpense] = useState("");
//   const friendExpense = bill ? bill - userExpense : "";
//   const [whoIsPaying, setWhoIsPaying] = useState("user");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!bill || !userExpense) return;

//     onSplitBill(
//       whoIsPaying === "user"
//         ? friendExpense
//         : // console.log("User Expense: " + userExpense)
//           -userExpense
//     );
//   };

//   return (
//     <form className="form-split-bill" onSubmit={handleSubmit}>
//       <h2>
//         Split a bill with {selectedFriend?.name}{" "}
//         <img
//           className="profile-img"
//           src={selectedFriend?.image}
//           alt="profile"
//         />
//       </h2>

//       <label>💰 Bill value</label>
//       <input
//         type="text"
//         value={bill}
//         onChange={(e) => setBill(Number(e.target.value))}
//       />

//       <label>🧍 Your expense</label>
//       <input
//         type="text"
//         value={userExpense}
//         onChange={(e) =>
//           setUserExpense(
//             Number(e.target.value) > bill ? userExpense : Number(e.target.value)
//           )
//         }
//       />

//       <label>👬 X's expense</label>
//       <input type="text" disabled value={friendExpense} />

//       <label>🤑 Who is paying the bill?</label>
//       <select
//         value={whoIsPaying}
//         onChange={(e) => setWhoIsPaying(e.target.value)}>
//         <option value="user">You</option>
//         <option value="friend">{selectedFriend?.name}</option>
//       </select>

//       <Button>Split bill</Button>
//     </form>
//   );
// }

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const friendExpense = bill ? bill - userExpense : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !userExpense) return;
    onSplitBill(whoIsPaying === "user" ? friendExpense : -userExpense);
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => {
          setBill(Number(e.target.value));
        }}
      />
      <label>Your expense</label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) => {
          setUserExpense(
            Number(e.target.value) > bill ? userExpense : Number(e.target.value)
          );
        }}
      />
      <label>{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={friendExpense} />
      <label>🤑 Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => {
          setUserExpense(e.target.value);
        }}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend?.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

// export default function App() {
//   const [friends, setFriends] = useState(initialFriends);
//   const [showAddFriend, setShowAddFriend] = useState(false);
//   // const [isSelected, setSelected] = useState(118836);
//   const [selectedFriend, setSelectedFriend] = useState(null);

//   const handleShowAddFriend = () => {
//     setShowAddFriend((showAddFriend) => !showAddFriend);
//   };

//   const handleAddFriend = (friend) => {
//     setFriends((friends) => [...friends, friend]);
//     setShowAddFriend(false);
//   };

// const handleSelect = (val) => {
//   // const friend = friends.find((friend) => friend === val);
//   // return friend;
//   setSelectedFriend((cur) => (cur?.id === val.id ? null : val));
//   // console.log(friend)
// };

//   const handleSplitBill = (val) => {
//     // console.log(val);
//     setFriends((friends) =>
//       friends.map((friend) =>
//         friend.id === selectedFriend.id
//           ? { ...friend, balance: friend.balance + val }
//           : friend
//       )
//     );

//     setSelectedFriend(null);
//   };

// useEffect(() => {
//   // // console.log(isSelected);
//   // handleSplitBill();
//   // // console.log(selectedFriend);
// }, [isSelected]);

//   return (
//     <div className="app">
//       <div className="sidebar">
//         {/* List of friends displaying img, name, and balance with 'Select' button */}
//         <FriendList
//           friends={friends}
//           selectedFriend={selectedFriend}
//           onSelect={handleSelect}
//         />
//         {/* Conditional component with friends state and handleAddFriend method being pushed in as props */}
//         {showAddFriend && (
//           <FormAddFriend friends={friends} handleAddFriend={handleAddFriend} />
//         )}
//         {/* Button component to toggle FormAddFriend component toggling showAddFriend state */}
//         <Button onClick={handleShowAddFriend}>
//           {showAddFriend ? "Close" : "Add Friend"}
//         </Button>
//       </div>
//       {/*  */}
//       {selectedFriend && (
//         <FormSplitBill
//           selectedFriend={selectedFriend}
//           onSplitBill={handleSplitBill}
//         />
//       )}
//     </div>
//   );
// }

// function Button({ onClick, children }) {
//   return (
//     <button onClick={onClick} className="button">
//       {children}
//     </button>
//   );
// }

// function FriendList({ friends, selectedFriend, onSelect }) {
//   return (
//     <ul>
//       {friends.map((friend) => (
//         <Friend
//           key={friend.id}
//           friend={friend}
//           selectedFriend={selectedFriend}
//           onSelect={onSelect}
//         />
//       ))}
//     </ul>
//   );
// }

// function Friend({ friend, selectedFriend, onSelect }) {
//   const isSelect = selectedFriend?.id === friend.id;

//   return (
//     <li className={isSelect ? "selected" : ""}>
//       <img src={friend.image} alt={friend.name} />
//       <h3>{friend.name}</h3>
//       {friend.balance < 0 && (
//         <p className="red">
//           You owe {friend.name} ${Math.abs(friend.balance)}
//         </p>
//       )}
//       {friend.balance > 0 && (
//         <p className="green">
//           {friend.name} owes you ${Math.abs(friend.balance)}
//         </p>
//       )}
//       {friend.balance === 0 && <p>You and {friend.name} are even</p>}
//       <Button onClick={() => onSelect(friend)}>Select</Button>
//     </li>
//   );
// }

// function FormAddFriend({ handleAddFriend }) {
//   const submitFriend = (e) => {
//     e.preventDefault();

//     if (!name || !image) return;

//     const id = crypto.randomUUID();

//     const newFriend = {
//       name: name,
//       image: `${image}?u=${id}`,
//       balance: 0,
//       id,
//     };
//     handleAddFriend(newFriend);

//     console.log(newFriend);
//     setName("");
//     setImage("https://i.pravatar.cc/48");
//   };

//   const [name, setName] = useState("");
//   const [image, setImage] = useState("https://i.pravatar.cc/48");

//   return (
//     <form className="form-add-friend" onSubmit={submitFriend}>
//       <label>👬 Friend Name</label>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <label>🌆 Image Url</label>
//       <input
//         type="text"
//         value={image}
//         onChange={(e) => setImage(e.target.value)}
//       />
//       <Button>Add</Button>
//     </form>
//   );
// }
