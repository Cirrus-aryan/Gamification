import { DataContext } from '@/Context/Context';
import { useContext } from 'react'
function Youtubetranscoder() {
       const {summary,setSummary } = useContext(DataContext);
  return (
    <div>
        <div><label>Youtube video URL</label><input className='border-1 my-4 w-full rounded-2xl p-2' placeholder="YoutubeUrl" type="text" onChange={(e)=>setSummary(e.target.value)} value={summary}/></div>
      
    </div>
  )
}

export default Youtubetranscoder