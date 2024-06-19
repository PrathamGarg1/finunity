export const getRoomId=(id1,id2) =>{
    const sorted=[id1,id2].sort();
    const roomId=sorted.join('-');
    return roomId
}

export const formatDate = (date) => {
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
  
    const formattedDate = `${day} ${month}`;
    return formattedDate;
  };
  