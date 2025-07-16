import { useContext } from 'react';
import { DataContext } from '@/Context/Context';

function Transcoder() {
  const {  summary, setSummary } = useContext(DataContext);

 

  return (
    <div className="flex flex-col m-3 gap-2">
      
      <textarea
        cols={12}
        rows={12}
        className="border rounded-2xl p-1"
        placeholder="Enter the summary"
        value={typeof summary === 'string' ? summary : ''}
        onChange={(e) => setSummary(e.target.value)}
      />
   

     
    </div>
  );
}

export default Transcoder;
