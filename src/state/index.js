import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    mode : "light",
    user:null,
    token:null,
    posts:[],
    chatMode : {mode:false,sender:"",reciever:"",sName:"",rName:""},
    messages : []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setMode : (state)=>{
          state.mode = state.mode==='light'?"dark":"light" 
          
        },
        setLogin : (state,action)=>{
            state.user=action.payload.user
            state.token= action.payload.token
        },
        setLogout : (state)=>{
            state.user= null;
            state.token = null;
        },
        setFriends : (state,action)=>{
           
              state.user.friends = action.payload.friends
            
        },
        setPosts : (state,action) =>{
            state.posts=action.payload.posts
        },
        setpost : (state,action)=>{
            const updatedPosts= state.posts.map((item)=>{
                if(item._id === action.payload.post_id){
                    return action.payload.post
                }
                state.posts =updatedPosts;
            })
        },
        likePost : (state,action)=>{
             state.posts = action.payload.posts
        },
        openChat : (state,action)=>{
            state.chatMode = action.payload.chatMode
        },
        setMessages : (state,action)=>{
            state.messages=action.payload.messages
        }

    }
})

export const {setMode,setLogin,setLogout,setFriends,setPosts,setPost,likePost,openChat,setMessages}= authSlice.actions
export default authSlice.reducer;