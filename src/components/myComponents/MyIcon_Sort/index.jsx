import React from 'react'



const MyIcon_Sort = (props) => {


    return (
        <span style={{backgroundColor:props.color,width:'20px',height:'20px',WebkitTextStroke:'1px white',fontStyle:'italic',
        fontSize:'14px',color:'white',borderRadius:'20%',display:props.show?'inline-block':'none',
       fontWeight:'bold',textAlign:'center'}}>{props.content}
        </span>
    )
}

export default MyIcon_Sort;