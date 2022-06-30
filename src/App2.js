import './App.css';
import UserList from './Components/UserList';
import CreateUser from './Components/CreateUser';
import { useRef, useReducer } from 'react';

const initialState = {
  inputs: {
    username:"",
    email: "",
  },
  users: [
    {
      id:1,   //php auto increment
      username:'green',
      email:'green@gamil.com',
      active: false,
    },
    {
      id:2,
      username:'blue',
      email:'blue@gamil.com',
      active: false,
    },
    {
      id:3,
      username:'yellow',
      email:'yellow@gamil.com',
      active: false,
    },
  ]
}

function reducer(state,action){
  switch(action.type){
    case "CHANGE_INPUT":
    return {
      ...state,
      inputs: {
        ...state.inputs,
        [action.name]: action.value,
      }
    }
    case "CREATE_USER":
    return {
      inputs: initialState.inputs,
        users: state.users.concat(action.user),
      // users: [...state.users, user]랑 같음
    };
    case "DELETE_USER":
    return {
      ...state, 
        users: state.users.filter( user => user.id !== action.id ),
    };
    case "ACTIVE_USER":
    return {
      ...state,
      users: state.users.map( user => 
        user.id === action.id ? {...user, active: !user.active } : user )
    };
    default:
    return state;
  }
}

//CreateUser인풋의 상태 관리를 App에서 
function App() {
  //useReducer로 상태관리
  const [ state, dispatch ] = useReducer(reducer, initialState);
  // 객체 구조분해할당
  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name: name,
      value: value,
    })
  }
  const onCreate = () => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username: username,
        email: email,
      }
    })
    nextId.current += 1;
  }
  const onDelete = (id) => {
    dispatch({
      type: "DELETE_USER",
      id: id,
    })
  }
  const onToggle = (id) => {
    dispatch({
      type: "ACTIVE_USER",
      id: id,
    })
  }
  const nextId = useRef(4); //4번째부터 
    // 배열에 새로운 항목을 추가하는 함수
    // users배열에 새로운 user객체를 추가
  return (
    <div className="App">
      <CreateUser email={email} username={username} onChange={onChange} onCreate={onCreate}/> 
      <UserList users={users} onDelete={onDelete} onToggle={onToggle}/>
    </div>
  );
}

export default App;
