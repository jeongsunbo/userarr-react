import React, { useEffect } from 'react';
import './UserStyle.css';
const User = ({user, onDelete, onToggle}) => {
    useEffect(()=>{
        console.log('컴포넌트가 화면에 나타남');
        return () => {
            console.log('컴포넌트가 화면에서 사라짐');
        }
    },[])
    // const { user } = props;
    return (
        <div>
            {/* user.active && 'active' -> &&는 하나라도 false면 false 둘다 true여야 true임*/}
            {/* span 클릭시 토글 붙여짐 */}
            <span className={user.active ? 'active' : "" } onClick={()=>{ onToggle(user.id) }}> 
                유저네임 : {user.username}
                이메일 : {user.email}
            </span>
            <button onClick={()=>{
                onDelete(user.id);
            }}>삭제</button>
        </div>
    );
}
const UserList = ({users, onDelete, onToggle}) => {
    return (
        <div>
            {users.map(user => <User user={user} key={user.id} onDelete={onDelete} onToggle={onToggle}/>)}
        </div>
    );
};

export default UserList;