import { Routes, Route } from 'react-router-dom';
import AfterBefore from './Components/AfterBefore'
import List from './Components/List'
import Profile from './Components/profile'
import PhotoEnhancer from './Components/PhotoEnhancer'
import AIImageGenerator from './Components/AIImageGenerator/AIImageGenerator';
import PhototoAIArt from './Components/Photo to AI Art/Photo-to-AI-Art';
import RemoveObjectsPhoto from './Components/MagicEraser/Remove-Objects-from-Photo';

import './App.css';


function App() {
  
  
  return (
    <>
    
    <Routes>
        <Route path="/" element={<AfterBefore/>} />
        <Route path="/List" element={<List/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/PhotoEnhancer" element={<PhotoEnhancer/>} />
        <Route path='/AIImageGenerator' element={<AIImageGenerator/>}/>
        <Route path='/PhototoAIArt' element={<PhototoAIArt/>}/>
        <Route path='/RemoveObjectsPhoto' element={<RemoveObjectsPhoto/>}/>
      </Routes>
     
    </>
  );
}
export default App;