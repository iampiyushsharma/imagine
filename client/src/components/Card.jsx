import React from 'react'
import { download , tlogo} from '../assets'
import { downloadImage } from '../utils'
const Card = ({_id, name, prompt, photo}) => {
  
  const handleTwitterShare = () => {
    // Assuming your 'photo' prop contains the URL of the image
    const tweetText = `Check out this amazing image created on \n${'https://imaginesomething.netlify.app/'}\nBy: ${name} \n\n${prompt}\n${photo}`;

    // Create the Twitter share URL
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

    // Open the tweet composer URL
    window.open(twitterShareUrl, '_blank');
  };
  
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img 
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
        <p className='text-white text-md overflow-y-auto prompt'>{prompt}</p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold'>
              {name[0]}
            </div>
            <p className='text-white text-sm'>{name}</p>
          </div>
          <div className='flex gap-2 items-center'>
            <button type='button' onClick={()=>downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
              <img src={download} alt='download' className='w-6 h-6 object-contain invert' />
            </button>
            <button type='button' onClick={handleTwitterShare} className="outline-none bg-transparent border-none">
              <img src={tlogo} alt='Twitter' className='w-6 h-6 object-contain invert' />
            </button>
          </div>

        </div>
      </div>
    </div>
    
    
    
    
  )
}

export default Card