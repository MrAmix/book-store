import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { AdminSidebar } from '../Sidebar/AdminSidebar';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../../App';
import { useForm } from "react-hook-form";
import img from "../../img/2023.png";
import FormControl from '@mui/base/FormControl';
import Input from '@mui/base/Input';
import axios from "axios"
import ImageListItem from '@mui/material/ImageListItem';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function MultiActionAreaCard() {
  const { globalStore, setGlobalStore  } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState([]);
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      if (loading) {
        const response = await fetch("http://localhost:5000/api/authors",{method: "GET",
        headers: {
          "Content-Type": "application/json",
      }});
      if (response.ok) {
        // convert the data to json
        const json = await response.json();
    
        // set state with the result
        setAuthors(json);
        return
      }
    }
    }
  
    fetchData()
      .catch(console.error).finally(()=>setLoading(false));
  }, [loading,authors])

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleAvatarChange = async event => {
    var reader = new FileReader();
    reader.onload = function (e) {
      setImage(e.target.result)
      console.log(e.target.result)
  }
  const file = event.target.files[0]; // Получение выбранного файла

  // Функция, вызываемая после чтения файла
  reader.onload = function (event) {
    const imageUrl = event.target.result; // URL содержимого изображения
    setImage(imageUrl); // Обновление состояния с новым изображением
  };

  reader.readAsDataURL(file); // Чтение файла в формате Data URL
  }
  
  const onSubmit = async (data,event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('preview', data.preview[0])
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('ageLimit', data.ageLimit)
    formData.append('count', data.count)
    formData.append('pageCount', data.pageCount)
    formData.append('price', data.price)
    formData.append('author_id', data.author)
    formData.append('currency', "RUB")
    
    await axios.post(`http://localhost:5000/api/books/`, formData).then(res => {
      window.location.reload();
    })
    console.log(data);
  }
  
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar/>
      <Box 
        sx={{ flexGrow: 1, p: 1,  marginTop: "64px"}}
        component="form"
        >
        <Card sx={{display:'flex'}}>
          <CardContent>
            <Box component="form" noValidate  onsubmit={handleSubmit(onSubmit)}>
              <Typography gutterBottom variant="h5" align="center" component="div">
                {"Создание книги"}
              </Typography>
              <ImageListItem sx={{height:"120px", width:"120px", display:"flex", flexDirection:"column", alignItems:"flex"}}>
              <img
              sx={{pointerEvents: 'none'}}
            src={image ? image : img}
            alt='User Avatar'
          />
          </ImageListItem>
          <FormControl>
            <Input
           {...register("preview" )}
              id='file-input'
              type='file'
              onChange={handleAvatarChange}
              placeholder=''
              style={{
                padding: '5px 0px'
              }}
            />
          </FormControl>
              <TextField
                size='small'
                margin="normal"
                required
                fullWidth
                id="name"
                helperText="Введите название книги."
                name="name"
                autoComplete="name"
                {...register("name", { required: true, maxLength: 80 })}
                autoFocus
              />
              <TextField
                size='small'
                margin="normal"
                required
                fullWidth
                id="description"
                helperText="Введите описание книги."
                name="description"
                autoComplete="description"
                {...register("description", { required: true, maxLength: 80 })}
              />
              <TextField
                size='small'
                margin="normal"
                required
                fullWidth
                helperText="Введите цену книги."
                name="price"
                type="price"
                id="price"
                {...register("price", { required: true, maxLength: 80 })}
              />
              <TextField
                size='small'
                margin="normal"
                required
                fullWidth
                helperText="Введите возрастное ограничение."
                name="ageLimit"
                type="ageLimit"
                id="ageLimit"
                {...register("ageLimit", { required: true, maxLength: 80 })}
              />
              <TextField
                size='small'
                margin="normal"
                required
                fullWidth
                helperText="Введите количество страниц."
                name="count"
                type="count"
                id="count"
                {...register("pageCount", { required: true, maxLength: 80 })}
              />
              <TextField
                size='small'
                margin="normal"
                required
                fullWidth
                helperText="Введите количество книг."
                name="count"
                type="count"
                id="count"
                {...register("count", { required: true, maxLength: 80 })}
              />
              <Select
                {...register("author", { required: true })}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={author}
                label="Выберите автора"
                onChange={handleAuthorChange}
              >
                {
                  authors.map((author) => (
                    <MenuItem value={author.id}>{author.name}</MenuItem>
                  ))
                }
              </Select>
              <Button
                color='success'
                type='submit'
                onClick={handleSubmit(onSubmit)}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Подтвердить
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}