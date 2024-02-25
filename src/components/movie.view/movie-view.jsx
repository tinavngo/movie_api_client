// Component prop here
export const  MovieView = ({ props, onBackClick }) =>  {
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
    <div>
        <span>Featured: </span>
        <span>{props.featured}</span>
    </div>
    <button onClick={onBackClick}> Back </button>
 </div> 
    );
};