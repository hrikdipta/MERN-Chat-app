
 export const getSender =(logedUser,members)=>{
    return members[0]._id === logedUser._id ? members[1]:members[0];
}