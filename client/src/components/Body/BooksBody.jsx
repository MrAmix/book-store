import axios from "axios";
import React, {useState,useEffect} from "react";
// import Box from '@mui/material/Box';
// import Typography from "@mui/material/Typography";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Box, Container } from "@mui/material";
function BooksBody() {
    const [currentPage,setCurrentPage]=useState(1)
    const [fetching,setFetching]=useState(true)
    const [totalCount,setTotalCount]=useState(0)

  const [photos, setPhotos] = useState([]);


  useEffect(() => {
    if (fetching) {
        axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
        .then(response =>
            {
                setPhotos([...photos,...response.data]);
                setCurrentPage(prevState=>prevState +1)
                setTotalCount(response.headers[`x-total-count`])
            }
        )
        .finally(()=>setFetching(false))
    }
}, [fetching, currentPage,photos]);


useEffect(() => {
    document.addEventListener(`scroll`,scrollHandler)
    return function (){
        document.removeEventListener(`scroll`,scrollHandler)
    }
});

const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) <100
     && photos.length < totalCount){
        setFetching(true)
    }
};

return (
<Container sx={{margin: '0 auto'}}>

    <ImageList sx={{ }} cols={5}>
    {photos.map((photo) => (
        <Box component="a" href={`books/${photo.id}`} sx={{textDecoration: 'none', color: 'inherit'}}>

      <ImageListItem key={photo.id}>
         <Box
        component="img"
        sx={{
            height: 200,
            width: 200,
            maxHeight: { xs: 200, md: 200 },
            maxWidth: { xs: 200, md: 200 },
        }}
        alt={photo.title}
        src={`${photo.thumbnailUrl}`}
        loading="lazy"
        />
        <ImageListItemBar
          title={photo.title}
          position="below"
          subtitle={<span>Ужасы</span>}
          sx={{width: '200px'}}
          />
      </ImageListItem>
          </Box>
    ))}
  </ImageList>
    </Container>
//     <div className={`BooksBody`}>

//      {photos.map((photo)=>
//      <Box
//      sx={{
    //          width: 300,
    //          height: 300,
//          border: '1px solid black',
//          margin: '5px'
//        }}
//        >
//        <Box
//        component="img"
//        sx={{
//            height: 233,
//            width: 350,
//            maxHeight: { xs: 233, md: 167 },
//            maxWidth: { xs: 350, md: 250 },
//        }}
//        alt="The house from the offer."
//        src={photo.thumbnailUrl}
//        />
//         <Typography component="h1" variant="h5">
//          Авторизация
//        </Typography>
//    </Box>
//     //  <div className="photo" key={photo.id}>
//     //      <div className="tatle">{photo.id},{photo.title}</div>
//     //      <img src={photo.thumbnailUrl} alt=""></img>
//     //  </div>
//      )}
//         </div>
  );
}
export default BooksBody;