// Component prop here
export const  MovieView = (props) =>  {
    return  (
    <div>
        <div>
            <img src={props.image}/>
        </div>
        <div>
            <span>Title: </span>
            <span>{props.title}</span>
        </div>
        <div>
        <span>Director: </span>
        <span>{props.directors}</span>
    </div>
    <div>
        <span>Description: </span>
        <span>{props.description}</span>
    </div>
    <div>
        <span>Genre: </span>
        <span>{props.genre}</span>
    </div>
 </div> 
    );
};