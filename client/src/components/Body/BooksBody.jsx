import React, {useState,useEffect} from "react";
// import Box from '@mui/material/Box';
// import Typography from "@mui/material/Typography";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
function BooksBody() {
    const [currentPage,setCurrentPage]=useState(1)
    const [fetching,setFetching]=useState(true)
    const [totalCount]=useState(0)
  
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
        if (fetching) {
      const response = await fetch("http://localhost:5000/api/books",{method: "GET",
      headers: {
        "Content-Type": "application/json",
    }});
    if (response.ok) {
      // convert the data to json
      const json = await response.json();
  
      // set state with the result
      setBooks([...books,...json]);
      setCurrentPage(prevState=>prevState +1)
     return
    }
    }
    }
  
    fetchData()
      .catch(console.error).finally(()=>setFetching(false));
  }, [fetching, currentPage,books])

useEffect(() => {
    document.addEventListener(`scroll`,scrollHandler)
    return function (){
        document.removeEventListener(`scroll`,scrollHandler)
    }
});

const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) <100
     && books.length < totalCount){
        setFetching(true)
    }
};

return (
<Container sx={{margin: '0 auto'}}>

    <ImageList sx={{ }} cols={5}>
    {books.map((book) => (
        <Link to ={`/books/${book.id}`} sx={{textDecoration: 'none', color: 'inherit'}}>

      <ImageListItem key={book.id}>
         <Box
        component="img"
        sx={{
            height: "80%",
            width: "80%",
            objectFit: "cover"
           // maxHeight: { xs: 200, md: 200 },
           // maxWidth: { xs: 200, md: 200 },
        }}
        alt={book.name}
        src={`http://localhost:5000/images/${book.preview}`}
        loading="lazy"
        />
        <ImageListItemBar
          title={book.name}
          position="below"
          subtitle={<span>Ужасы</span>}
          sx={{width: '200px'}}
          />
      </ImageListItem>
          </Link>
    ))}
  </ImageList>
    </Container>
  );
}
export default BooksBody;
