import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'


const CreatePost = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [form, setForm] = useState({
    name:'',
    prompt:'',
    photo:'',
    photo2:'',
    photo3:'',
    

  })
  
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) =>{
    e.preventDefault();

    if(form.prompt && selectedImage){
      setLoading(true);
      try {
        const formData = {
          name: form.name,
          prompt: form.prompt,
          photo: selectedImage,
        };
        const response = await fetch("http://localhost:8080/api/v1/post",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        await response.json();
        console.log(response);
        navigate('/');
      }catch (error) {
          alert(error)
      }finally{
        setLoading(false);
      } 
    }else{
      alert('Please enter a prompt and generate an image')
    }
  }

  const generateImage = async() =>{
    if(form.prompt){
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({prompt: form.prompt,}),
        });
        const data = await response.json();
        // console.log(data);
        setForm({...form,photo:`data:image/jpeg;base64,${data.photo}` ,photo2:`data:image/jpeg;base64,${data.photo2}`,photo3:`data:image/jpeg;base64,${data.photo3}`})
        
        //console.log(form.photo);
        
      }catch (error) {
        alert(error);
        console.log(error);
      }finally{
        setGeneratingImg(false);
      }
    }else{
      alert('Please enter a prompt')
    }
  }

  const handleChange = (e) =>{
    setForm({...form, [e.target.name]: e.target.value})
    
  }

  const handleSurpriseMe = () =>{
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt: randomPrompt})
    
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Imagine</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Take your imagination on a ride to shock yourself</p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5 '>
          <FormField 
            labelname="Your name"
            type="text"
            name="name"
            placeholder="Piyush"
            value={form.name}
            handleChange = {handleChange}
          />
          <FormField 
            labelname="Prompt"
            type="text"
            name="prompt"
            placeholder='A realistic photograph of a young woman with blue eyes and blonde hair'
            value={form.prompt}
            handleChange = {handleChange}
            isSurpriseMe
            handleSurpriseMe = {handleSurpriseMe}
          />

          <div className='relative bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-90 p-3 h-70 flex justify-center '>
            {form.photo ? (
              <>
              <lable>
              <input 
                type="radio"
                name="selectedPhoto"
                value={form.photo}
                checked={selectedImage === form.photo}
                onChange={() => setSelectedImage(form.photo)}
              />
              <img
                src={form.photo}
                alt={form.prompt}
                className='w-12/12 h-12/12 object-contain'
              />
              </lable>

              <label>
              <input
                type="radio"
                name="selectedPhoto"
                value={form.photo2}
                checked={selectedImage === form.photo2}
                onChange={() => setSelectedImage(form.photo2)}
              />
              <img
                src={form.photo2}
                alt={form.prompt}
                className='w-12/12 h-12/12 object-contain'
                
              />
              </label>

              <lable>
              <input 
                type="radio"
                name="selectedPhoto"
                value={form.photo3}
                checked={selectedImage === form.photo3}
                onChange={() => setSelectedImage(form.photo3)}
              />
              <img
                src={form.photo3}
                alt={form.prompt}
                className='w-12/12 h-12/12 object-contain'
              />
              </lable>

              

              </>
            ): (
              <>
              <lable>
              <input 
                type="radio"
                name="selectedPhoto"
                value={form.photo}
                checked={selectedImage === form.photo}
                onChange={() => setSelectedImage(form.photo)}
              />
              <img 
                src={preview}
                alt={preview}
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
              </lable>
              <label>
              <input
                type="radio"
                name="selectedPhoto"
                value={form.photo2}
                checked={selectedImage === form.photo2}
                onChange={() => setSelectedImage(form.photo2)}
              />
              <img 
                src={preview}
                alt={preview}
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
              </label>
              <lable>
              <input 
                type="radio"
                name="selectedPhoto"
                value={form.photo}
                checked={selectedImage === form.photo}
                onChange={() => setSelectedImage(form.photo)}
              />
              <img 
                src={preview}
                alt={preview}
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
              </lable>
              
              
              </>
              
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
          
        </div>
        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {generatingImg ? 'Unleashing...' : 'Unleash'}
          </button>
        </div>
        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>Select any of them to share with the world</p>
          <button
            type="submit"
            className='mt-3 text-white bg-[black] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >  
            {loading ? 'Doing...' : 'Show off now'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost