const Choose=({data,onClick})=>{
    return (
        <div className="col-3 seat">
          <div className={''} onClick={()=>onClick(data?.id)}>
            {data?.name}
         </div> 
        </div>
    )
}
export default Choose;